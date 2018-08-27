pragma solidity ^0.4.24;

/** @title NoFilter */
contract NoFilter {
    address public owner;

    /** @dev Constructor function   */
    constructor() public {owner = msg.sender;}
    
    /**A struct holding and uploaded files details */
    struct File {
        address uploaderId;
        string description;
        int vote;
    }
     
    /** @dev event emmitted when a user up votes ot down votes a file. Vote count can be used to filter front end results. */ 
    event Vote(address voter, bytes32 indexed ipfsHash, int vote); 
    
    /** @dev event emmitted when a file is uploaded to ipfs */
    event Alert(address indexed uploaderId, bytes32 indexed ipfsHash);
    
    /** @dev mapping between ipfs hashes and File struct  */
    mapping(bytes32 => File) public details;

    /**
    * @dev upvotes a file, increasing its vote count, votes are helpful in ranking and filtering on the front end
    * @param ipfsHash bytes32
    * @return details[ipfshash].vote which will be the current vote count
    */
    function upVote(bytes32 ipfsHash) public  returns (int) {
        details[ipfsHash].vote += 1;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }

    /**
    * @dev upvotes a file, decreasing its vote count, votes are helpful in ranking and filtering on the front end
    * @param ipfsHash bytes32
    * @return details[ipfshash].vote which will be the current vote count
    */
    function downVote(bytes32 ipfsHash) public  returns (int) {
        details[ipfsHash].vote -= 1;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }

    /**
    * @dev this is the heart of the contract it saves the data to the chain relating to the uploaded files
    * @param _uploaderId address of the user
    * @param _description string description of the file being uploaded
    */
    function upload(address _uploaderId, string _description, bytes32 ipfsHash ) public {
        int beginningVote = 1;
        File memory newFile = File(_uploaderId, _description, beginningVote);

        details[ipfsHash] = newFile;
        emit Alert(msg.sender, ipfsHash);
    }
    
    /**
    * @dev this is a safety mechanism reserved for the contract owner. it is intended to be used to downvote a file dramatically. it is suggested to be used in the event inappropriate or illegal files are posted through the site (eg. child pornography, terrorist materials etc..). This function will not destroy a file hosted on ipfs but provides a handy way to filter for such files on a front end. 
    * @param ipfsHash bytes32 
    * @return details[ipfs[ipfsHash].vote which will return the current vote count
    */
    function delist(bytes32 ipfsHash) public  returns (int) {
        require(msg.sender == owner, "Sender not authorized.");
       
        details[ipfsHash].vote -= 1000;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }
    
    /** 
    * @dev returns the details of a uploaded file from the mapping
    * @param ipfsHash bytes32 
    * @return details[ipfsHash].uploaderId address, details[ipfsHash].description String, details[ipfsHash].vote int
    */
    function getDetails(bytes32 ipfsHash) public view returns (
        address,
        string,
        int
    ) {
        return (details[ipfsHash].uploaderId,
            details[ipfsHash].description,
            details[ipfsHash].vote);
    }

    /**
    * @dev this is the emergency stop function--suicide function only callable by owner. 
    *Use this to disable a contract and then call the update function on NoFilterRegistry.sol with a new 
    * contract address to point the front end at. USE WITH EXTREME CAUTION!!!
    */
    function kill() public {
        require(msg.sender == owner, "Sender not authorized.");
        selfdestruct(owner);
    }

    /** @dev this is a Fallback function to be used as a catchall if an unrecognized function is called */
    function() public payable { }
}