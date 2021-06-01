pragma solidity ^0.5.0;

/*
Contract Description:

*********** Delivery Person ***********

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
    }
    // Health State related
    mapping(address => Deliver) private _HealthStatus;

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
        _HealthStatus[msg.sender].FirstName = _FirstName;
        _HealthStatus[msg.sender].LastName = _LastName;
        _HealthStatus[msg.sender].Email = _Email;
        _HealthStatus[msg.sender].Phone = _Phone;
        _HealthStatus[msg.sender].TravelOrNot = _TravelOrNot;
        _HealthStatus[msg.sender].otherSymptom = _otherSymptom;
        _HealthStatus[msg.sender].Contact = _Contact;
        _HealthStatus[msg.sender].Symptom = _Symptom;

        // Success
        return true;
    }

    /**************
     * Client Side *
     ***************
     */

    // Get the health status of a specific delivery person (by address)
    // Return array: [FName, LName, Email, Phone ......]
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
}
