pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2; // ABI Encoder
import "./queue.sol";

/*
Contract Description:

*********** Delivery Person ***********
1. UploadHealthStatus(string memory _FirstName,
        string memory _LastName,
        string memory _Email,
        string memory _Phone,
        bool _TravelOrNot,
        bool _otherSymptom,
        bool _Contact,
        bool _Symptom): Upload the health status of the sender

2. DeleteDeliver(): Delete himself from the Queue when he can not work

3. GetMatchedCustomer(): Return the address of customer
    @Return: (bool matched, address customer)
        1. If matched == false: then the deliver has not been matched yet
        2. if matched == true: then customer denotes the address(Ethereum)  

4. GetOrderByAddress(address _customer)public view returns
    (int256[], string memory, string memory, int memory)
    @ Returns: (Product number[], real_address, phone, total)

5. GetProduct():
    @ Product name in tuple: (Product1, Product2, ...., Product6)

6. FinishMatch(address customer): Finish the match with the customer and inform the customer to take his order(send photos and location)

7. UploadDeliveryHistory(string memory _newdest): 
    Upload the latest destination of delivery man (The parameter is the real address)
    
*********** Client Side ***********
1. GetHealthStatus(address DP): get the health status of DP
    @Return: (_FirstName, _LastName, _Email, _Phone, _TravelOrNot, _otherSymptom, _Contact, _Symptom)
1.5 GetDeliverHistory(address Deliv): Get the latest 50 delivery history of this deliver
    @Return: string[] Ex:["Taipei101", "NTU", ..., "KFC"]

2. GetAllDeliver(): get the addresses of all available delivery people
    @Return: [] Array containing the addresses of all delivery people

3. MatchWithDeliver(address _deliver): Modify the "customer" property of the Deliver

4. UploadOrder(
        int256[] _product_num,
        string memory _real_address,
        string memory _phone,
        string memory _restaurant_addr,
        int256 memory _total
    ): Upload the order and some information of customer
5. OrderArrive(): 
    @ Return: bool  => denotes whether the order has arrived
*/

contract COVID is queue {
    /**********
     * Struct Definition (mapping)
     ************
     */

    // Delivery Person
    struct Deliver {
        string FirstName;
        string LastName;
        string Email;
        string Phone;
        bool TravelOrNot;
        bool otherSymptom;
        bool Contact;
        bool Symptom;
        bool exist; // whether this person exist
        uint256 id; // the id to help us find this guy in the array
        address customer; // the address of the matched customer
        bool matched; // whether this deliver is matched
        Queue delivery_history; // all the locations where this deliver has been before
    }
    // Customer
    struct Customer {
        int256[6] Product_num; // how many of them are ordered for each product
        string real_address;
        string phone;
        bool arrived; // whether the order has arrived
        int256 total; // total cost of the order
        string restaurant_address;
    }

    struct Image {
        uint256 id;
        string hash;
        string description;
        uint256 tipAmount;
        address payable author;
    }
    /***********
     * Event definition
     ******************
     */
    event UploadHistory(string[] allhistory, string newhistory);
    event ImageCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );
    event UpdateHealth(address DP);
    /**********
     * Private data structures (mapping)
     ************
     */
    // Define Set to record all the delivery person
    // Health State related
    mapping(address => Deliver) private _DeliverStatus;
    address[] private Delivers;

    // Record the Order of a customer
    mapping(address => Customer) private _CustomerOrder;

    // Image
    uint256 public imageCount = 0;
    mapping(uint256 => Image) public images;

    /***************
     * Image Operations
     ******************
     */

    function uploadImage(string memory _imgHash, string memory _description)
        public
    {
        // Make sure the image hash exists
        require(bytes(_imgHash).length > 0);
        // Make sure image description exists
        require(bytes(_description).length > 0);
        // Make sure uploader address exists
        require(msg.sender != address(0));

        // Increment image id
        imageCount++;

        // Add Image to the contract
        images[imageCount] = Image(
            imageCount,
            _imgHash,
            _description,
            0,
            msg.sender
        );
        // Trigger an event
        emit ImageCreated(imageCount, _imgHash, _description, 0, msg.sender);
    }

    /*************
     * Delivery Side
     ***************
     */
    // Upload the health status

    function UploadHealthStatus(
        string memory _FirstName,
        string memory _LastName,
        string memory _Email,
        string memory _Phone,
        bool _TravelOrNot,
        bool _otherSymptom,
        bool _Contact,
        bool _Symptom
    ) public returns (bool) {
        if (!_DeliverStatus[msg.sender].exist) {
            //Add this deliver person into the array
            Delivers.push(msg.sender);
            _DeliverStatus[msg.sender].id = Delivers.length - 1;
        }
        _DeliverStatus[msg.sender].FirstName = _FirstName;
        _DeliverStatus[msg.sender].LastName = _LastName;
        _DeliverStatus[msg.sender].Email = _Email;
        _DeliverStatus[msg.sender].Phone = _Phone;
        _DeliverStatus[msg.sender].TravelOrNot = _TravelOrNot;
        _DeliverStatus[msg.sender].otherSymptom = _otherSymptom;
        _DeliverStatus[msg.sender].Contact = _Contact;
        _DeliverStatus[msg.sender].Symptom = _Symptom;
        _DeliverStatus[msg.sender].exist = true;
        // Success
        // Use Event to show the uploaded data in logs
        emit UpdateHealth(msg.sender);
        return true;
    }

    // Delete Delivery Person
    function DeleteDeliver() public {
        address person = msg.sender;
        if (_DeliverStatus[person].exist) {
            _DeliverStatus[person].exist = false;

            // Since solidity does not have set, we need to swap the person with the last person
            uint256 index = _DeliverStatus[person].id;
            Delivers[index] = Delivers[Delivers.length - 1];
            Delivers.pop();
        }
    }

    // Get the address of matched customer
    function GetMatchedCustomer() public view returns (bool, address) {
        Deliver memory DP = _DeliverStatus[msg.sender];
        return (DP.matched, DP.customer);
    }

    function GetOrderByAddress(address _customer)
        public
        view
        returns (
            int256[6] memory,
            string memory,
            string memory,
            string memory,
            int256
        )
    {
        Customer memory customer = _CustomerOrder[_customer];
        return (
            customer.Product_num,
            customer.real_address,
            customer.phone,
            customer.restaurant_address,
            customer.total
        );
    }

    function FinishMatch(address customer) public {
        require(
            _DeliverStatus[msg.sender].exist == true,
            "FinishMatch:This Deliver does not exist"
        );
        _DeliverStatus[msg.sender].matched = false;
        _CustomerOrder[customer].arrived = true;
    }

    // Get all the product name
    function GetProduct()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            "Chocolate Cake",
            "Cupcake",
            "Ice Cream",
            "Donut",
            "Macaron",
            "Milkshake"
        );
    }

    function UploadDeliveryHistory(string memory _newdest) public {
        // Make sure this deliver exist
        require(
            _DeliverStatus[msg.sender].exist == true,
            "UploadDeliveryHistory: The deliver does not exist!"
        );
        require(
            bytes(_newdest).length > 0,
            "UploadDeliveryHistory: The latest delivery history should not be empty string!"
        );

        push(_DeliverStatus[msg.sender].delivery_history, _newdest);
        emit UploadHistory(
            datas(_DeliverStatus[msg.sender].delivery_history),
            _newdest
        );
    }

    /**************
     * Client Side *
     ***************
     */

    // Get the health status of a specific delivery person (by address)
    function GetHealthStatus(address Deliv)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            bool,
            bool,
            bool,
            bool
        )
    {
        Deliver memory deliver = _DeliverStatus[Deliv];

        // test whether this person exist
        require(
            deliver.exist == true,
            "GetHealthStatus: this delivery person does not exist!"
        );

        // Return the health status by an array
        return (
            deliver.FirstName,
            deliver.LastName,
            deliver.Email,
            deliver.Phone,
            deliver.TravelOrNot,
            deliver.otherSymptom,
            deliver.Contact,
            deliver.Symptom
        );
    }

    function GetDeliverHistory(address Deliv)
        public
        view
        returns (string[] memory)
    {
        require(
            _DeliverStatus[Deliv].exist == true,
            "GetDeliverHistory: The deliver does not exist!"
        );
        return datas(_DeliverStatus[Deliv].delivery_history);
    }

    // Get the addresses of all delivery people
    function GetAllDeliver() public view returns (address[] memory) {
        // Mark the returned type as memory so the returned thing is not the address of Delivers but the array
        return Delivers;
    }

    // Match with the Deliver
    function MatchWithDeliver(address _address) public {
        // test whether this person exist
        require(
            _DeliverStatus[_address].exist == true,
            "MatchWithDeliver: this delivery person does not exist!"
        );
        // _address: Deliver msg.sender:customer
        _DeliverStatus[_address].customer = msg.sender;
        _DeliverStatus[_address].matched = true;
    }

    // Upload the Order of Customer
    function UploadOrder(
        int256[6] memory _product_num,
        string memory _real_address,
        string memory _phone,
        string memory _restaurant_address,
        int256 _total
    ) public {
        Customer storage customer = _CustomerOrder[msg.sender];

        customer.Product_num = _product_num;
        customer.real_address = _real_address;
        customer.phone = _phone;
        customer.restaurant_address = _restaurant_address;
        customer.arrived = false;
        customer.total = _total;
    }

    function OrderArrive() public view returns (bool) {
        // Whether the order arrived
        bool arrived = _CustomerOrder[msg.sender].arrived;
        return arrived;
    }
}
