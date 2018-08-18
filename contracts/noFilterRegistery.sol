pragma solidity ^0.4.24;

contract noFilterRegistry {
    address backendContract;
    address[] previousBackends;
    address owner;

    constructor() public {
        owner = msg.sender;
    }

  

    function changeBackend(address newBackend) public
    returns (bool)
    {
        require(msg.sender == owner, "Sender not authorized.");

        if(newBackend != backendContract) {
            previousBackends.push(backendContract);
            backendContract = newBackend;
            return true;
        }

        return false;
    }
}