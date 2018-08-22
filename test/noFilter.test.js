const { expect, assert } = require("chai");
const NoFilter = artifacts.require("NoFilter");
const { getBytes32FromMultiash } = require("../src/utils/multihash");

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
    let ipfshash = 0xca35b7d915458ef540ade6068dfe2f44e8fa733c;
    let bytes32 = await getBytes32FromMultiash(ipfshash);
    await contractInstance.upload(
      accounts[2],
      "this is a testFile",
      ["one"],
      bytes32
    );
    let upVote = await contractInstance.upVote(bytes32);
    assert.equal(upVote, expected);
  });

  it("will decrease the vote on file by one", async () => {});

  it("delist file", async () => {});

  it("updates tags", async () => {});

  it("returns details of file", async () => {});
});
