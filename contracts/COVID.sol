pragma solidity ^0.5.0;

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
*********** Client Side ***********
1. GetHealthStatus(address DP): get the health status of DP
    @Return: (_FirstName, _LastName, _Email, _Phone, _TravelOrNot, _otherSymptom, _Contact, _Symptom)

2. GetAllDeliver(): get the addresses of all available delivery people
    @Return: [] Array containing the addresses of all delivery people
*/

contract COVID {
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
    }
    // Define Set to record all the delivery person
    // Health State related
    mapping(address => Deliver) private _HealthStatus;
    address[] private Delivers;

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
        if (!_HealthStatus[msg.sender].exist) {
            //Add this deliver person into the array
            Delivers.push(msg.sender);
            _HealthStatus[msg.sender].id = Delivers.length - 1;
        }
        _HealthStatus[msg.sender].FirstName = _FirstName;
        _HealthStatus[msg.sender].LastName = _LastName;
        _HealthStatus[msg.sender].Email = _Email;
        _HealthStatus[msg.sender].Phone = _Phone;
        _HealthStatus[msg.sender].TravelOrNot = _TravelOrNot;
        _HealthStatus[msg.sender].otherSymptom = _otherSymptom;
        _HealthStatus[msg.sender].Contact = _Contact;
        _HealthStatus[msg.sender].Symptom = _Symptom;
        _HealthStatus[msg.sender].exist = true;
        // Success
        return true;
    }

    // Delete Delivery Person
    function DeleteDeliver() public {
        address person = msg.sender;
        if (_HealthStatus[person].exist) {
            _HealthStatus[person].exist = false;

            // Since solidity does not have set, we need to swap the person with the last person
            uint256 index = _HealthStatus[person].id;
            Delivers[index] = Delivers[Delivers.length - 1];
            Delivers.pop();
        }
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
        Deliver memory deliver = _HealthStatus[Deliv];

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

    // Get the addresses of all delivery people
    function GetAllDeliver() public view returns (address[] memory) {
        // Mark the returned type as memory so the returned thing is not the address of Delivers but the array
        return Delivers;
    }
}
