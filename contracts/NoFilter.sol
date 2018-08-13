pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;

contract NoFilter {
    address owner;

    constructor() public {owner = msg.sender;}
    
    function kill() public { if (msg.sender == owner) selfdestruct(owner); }
    
    struct Item {
        address ownerId;
        string description;
        string[] tags;
        uint vote;
    }
    
    
    
    event Vote(
      address voter,        
      bytes32 indexed _item,
      uint vote
    );
    
    event Alert(
        address indexed ownerId,
        bytes32 indexed _item
    );
    
    mapping(bytes32 => Item) public details;

    function upVote(bytes32 _item) public payable returns (uint) {
        details[_item].vote += 1;
        emit Vote(msg.sender, _item, details[_item].vote);
        return details[_item].vote;
    }

    function downVote(bytes32 _item) public payable returns (uint) {
        details[_item].vote -= 1;
        emit Vote(msg.sender, _item, details[_item].vote);
        return details[_item].vote;
    }

    function upload(address _ownerId, string _description, string[] _tags, bytes32 _item ) public {
        uint beginningVote = 1;
        details[_item] = Item(_ownerId, _description, _tags, beginningVote );
        emit Alert(msg.sender, _item);
    }
    
    function delist(bytes32 _item) public payable returns (uint) {
        require(msg.sender == owner);
        details[_item].vote -= 1000;
        emit Vote(msg.sender, _item, details[_item].vote);
        return details[_item].vote;
    }
    

    function getDetails(bytes32 _item) public view returns (
        address,
        string,
        string[],
        uint
    ) {
       return (details[_item].ownerId,
        details[_item].description,
        details[_item].tags,
        details[_item].vote);
    }
    function() public payable { };
}