const expect = require("chai").expect;
const NoFilter = artifacts.require("NoFilter");

const IPFS_HASHES = ["", ""];

let contractInstance;

beforeEach(async () => {
  contractInstance = await NoFilter.deployed();
});

contract("NoFilter Tests", async accounts => {
  it("contract should be owned by the correct address", async () => {
    let owner = await contractInstance.owner.call();
    expect(owner.valueOf()).to.equal(accounts[0]);
  });

  it("will increase vote on file by one", async () => {
    let expected = 1;
    await contractInstance.upload(
      accounts[2],
      "this is a testFile",
      ["one", "two"],
      "0xca35b7d915458ef540ade6068dfe2f44e8fa733c"
    );
    let upVote = await contractInstance.upVote(
      "0xca35b7d915458ef540ade6068dfe2f44e8fa733c"
    );
    expect(upVote).to.equal(1);
  });
});
