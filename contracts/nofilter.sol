pragma solidity 0.4.24;
pragma experimental ABIEncoderV2;

contract NoFilter {
    struct Item {
        address ownerId;
        string description;
        string[] tags;
    }
  
    event Alert(
        address indexed owner,
        bytes32 indexed _item
    );
    
    mapping(bytes32 => Item) public details;
    
    function upload(address _ownerId, string _description, string[] _tags, bytes32 _item ) public {
        details[_item] = Item(_ownerId, _description, _tags);
        emit Alert(msg.sender, _item);
    }
    

}