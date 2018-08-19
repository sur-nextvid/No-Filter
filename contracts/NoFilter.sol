pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract NoFilter {
    address public owner;

    constructor() public {owner = msg.sender;}
    
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
    
    struct File {
        address uploaderId;
        string description;
        string[] tags;
        uint vote;
    }
    
    
    
    event Vote(
      address voter,        
      bytes32 indexed ipfsHash,
      uint vote
    );
    
    event Alert(
        address indexed uploaderId,
        bytes32 indexed ipfsHash
    );
    
    mapping(bytes32 => File) public details;

    function upVote(bytes32 ipfsHash) public  returns (uint) {
        details[ipfsHash].vote += 1;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }

    function downVote(bytes32 ipfsHash) public  returns (uint) {
        details[ipfsHash].vote -= 1;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }

    function upload(address _uploaderId, string _description, string[] _tags, bytes32 ipfsHash ) public {
        uint beginningVote = 1;
        details[ipfsHash] = File(_uploaderId, _description, _tags, beginningVote);
        // Item memory item = Item(_uploaderId, _description, _tags, beginningVote);
        // details[ipfsHash] = item;
        emit Alert(msg.sender, ipfsHash);
    }
    
    function delist(bytes32 ipfsHash) public  returns (uint) {
        require(msg.sender == owner, "Sender not authorized.");
         /* should i be using this or a modifier like onlyOwner() { require(msg.sender==owner)_;} */
        details[ipfsHash].vote -= 1000;
        emit Vote(msg.sender, ipfsHash, details[ipfsHash].vote);
        return details[ipfsHash].vote;
    }
    
    function updateTags(bytes32 ipfsHash, string[] _tags) public {
        //details[ipfsHash] = Item(details[ipfsHash].uploaderId, details[ipfsHash].description, _tags, details[ipfsHash].vote);
        details[ipfsHash].tags = _tags;
        emit Alert(msg.sender, ipfsHash);
    }

    function getDetails(bytes32 ipfsHash) public view returns (
        address,
        string,
        string[],
        uint
    ) {
        return (details[ipfsHash].uploaderId,
            details[ipfsHash].description,
            details[ipfsHash].tags,
            details[ipfsHash].vote);
    }
    function() public payable { }
}