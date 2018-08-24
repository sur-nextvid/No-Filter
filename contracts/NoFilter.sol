pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

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
        bytes20[10] tags;
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

    function upload(address _uploaderId, string _description, bytes20[10] _tags, bytes32 ipfsHash ) public {
        int beginningVote = 1;
        details[ipfsHash] = File(_uploaderId, _description, _tags, beginningVote);
        emit Alert(msg.sender, ipfsHash);
    }
    
    function delist(bytes32 ipfsHash) public  returns (int) {
        require(msg.sender == owner, "Sender not authorized.");
       
        details[ipfsHash].vote -= 1000;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }
    
    function updateTags(bytes32 ipfsHash, bytes20[10] _tags) public returns (bytes20[10]){
        
        details[ipfsHash].tags = _tags;
        emit Alert(msg.sender, ipfsHash);
        return details[ipfsHash].tags;
    }

    function getDetails(bytes32 ipfsHash) public view returns (
        address,
        string,
        bytes20[10],
        int
    ) {
        return (details[ipfsHash].uploaderId,
            details[ipfsHash].description,
            details[ipfsHash].tags,
            details[ipfsHash].vote);
    }
    function() public payable { }
}