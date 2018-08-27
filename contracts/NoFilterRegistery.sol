pragma solidity ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';


/**
*   @title Registry Contract for NoFilter DApp
 */

contract NoFilterRegistry is Ownable {

    /**  variables for contract storage */

    /** Current NoFilter Contract */
    address public backendContract;

    /** An array of previous contract addresses */
    address[] public previousBackends;

    /** Contract Owner */
    address public owner;


    /**
    * @dev Constructor function
     */
    constructor() public {
        owner = msg.sender;
    }

    /**
    * @dev Gets the length of array holding prior addresses
    * @return uint representing the length of array
     */
    function previousBackendsLength() public view returns(uint){
        return previousBackends.length;
    }

    /**
    * @dev Gets the current NoFilter address
    * @return address of NoFilter contract
    */
    function getBackendContract() public view returns(address){
        return backendContract;
    }

    /**
    * @dev updates the current NoFilter address and saves the old one to the array
    * @param newBackend address
    * @return bool confirming success of update
     */
    function changeBackend(address newBackend) public onlyOwner
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
