pragma solidity ^0.4.24;


contract NoFilter {
    address public owner;

    constructor() public {owner = msg.sender;}
    
    function kill() public {
        require(msg.sender == owner, "Sender not authorized.");
        selfdestruct(owner);
    }
    

    struct File {
        address uploaderId;
        string description;
        int vote;
    }
    
    
    
    event Vote(address voter, bytes32 indexed ipfsHash, int vote); 
    
    event Alert(address indexed uploaderId, bytes32 indexed ipfsHash);
    
    mapping(bytes32 => File) public details;

    function upVote(bytes32 ipfsHash) public  returns (int) {
        details[ipfsHash].vote += 1;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }

    function downVote(bytes32 ipfsHash) public  returns (int) {
        details[ipfsHash].vote -= 1;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }

    function upload(address _uploaderId, string _description, bytes32 ipfsHash ) public {
        int beginningVote = 1;
        File memory newFile = File(_uploaderId, _description, beginningVote);

        details[ipfsHash] = newFile;
        emit Alert(msg.sender, ipfsHash);
    }
    
    function delist(bytes32 ipfsHash) public  returns (int) {
        require(msg.sender == owner, "Sender not authorized.");
       
        details[ipfsHash].vote -= 1000;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }

    function getDetails(bytes32 ipfsHash) public view returns (
        address,
        string,
        int
    ) {
        return (details[ipfsHash].uploaderId,
            details[ipfsHash].description,
            details[ipfsHash].vote);
    }
    function() public payable { }
}