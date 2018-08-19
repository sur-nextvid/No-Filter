pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "../contracts/NoFilterRegistery.sol";


contract TestNoFilterRegistry {
  
    function testSettingAnOwnerDuringCreation() public {
        NoFilterRegistry noFilterRegistry = new NoFilterRegistry();
        Assert.equal(noFilterRegistry.owner(), this, "An owner is different than a deployer");
    }

    function testChangeBackend() public {
        NoFilterRegistry noFilterRegistry = new NoFilterRegistry();
        noFilterRegistry.changeBackend(0xF4a2a80c3b39Bc7F843C05A61ce42dB858EeCF13);
        Assert.equal(noFilterRegistry.changeBackend(this),true, "address updated");
    }
}