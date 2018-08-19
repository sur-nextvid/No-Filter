pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "../contracts/NoFilter.sol";

contract TestNoFilter {

   function testSettingAnOwnerDuringCreation() public {
        NoFilter noFilter = new NoFilter();
        Assert.equal(noFilter.owner(), this, "An owner is different than a deployer");
    }

}