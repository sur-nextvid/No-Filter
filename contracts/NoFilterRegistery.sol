pragma solidity ^0.4.24;

contract NoFilterRegistry {
    address public backendContract;
    address[] public previousBackends;
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    function previousBackendsLength() public view returns(uint){
        return previousBackends.length;
    }

    function getBackendContract() public view returns(address){
        return backendContract;
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