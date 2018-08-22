const expect = require("chai").expect;
const NoFilter = artifacts.require("NoFilter");

const ADDRESS = "0x627306090abab3a6e1400e9345bc60c78a8bef57";
const IPFS_HASHES = ["", ""];

let contractInstance = null;
let accounts = null;
let owner = null;
let account_one = null;
let account_two = null;

beforeEach(async () => {
  contractInstance = await NoFilter.deployed();
});

contract("NoFilter Tests", async accounts => {
  it("contract should be owned by the correct address", async () => {
    owner = await contractInstance.owner.call();
    expect(owner.valueOf()).to.equal(ADDRESS);
  });
});
