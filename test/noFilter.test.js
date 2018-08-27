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
    let expected = 2;
    let ipfshash = "Qmbz5g7houBH89C47NGWemErjyi2RgupEjk1q1hTcXVY8U";
    let bytes32 = await getBytes32FromMultiash(ipfshash);
    await contractInstance.upload(
      accounts[2],
      "this is a desc",
      bytes32.digest
    );

    let upVote = await contractInstance.upVote.call(bytes32.digest);
    assert.equal(upVote, expected);
  });

  it("will decrease the vote on file by one", async () => {
    let expected = 0;
    let ipfshash = "Qmbz5g7houBH89C47NGWemErjyi2RgupEjk1q1hTcXVY8U";
    let bytes32 = await getBytes32FromMultiash(ipfshash);
    await contractInstance.upload(
      accounts[2],
      "this is a desc",
      bytes32.digest
    );

    let downVote = await contractInstance.downVote.call(bytes32.digest);

    assert.equal(downVote, expected);
  });

  it("will delist file by ", async () => {
    let expected = -999;
    let ipfshash = "Qmbz5g7houBH89C47NGWemErjyi2RgupEjk1q1hTcXVY8U";
    let bytes32 = await getBytes32FromMultiash(ipfshash);
    await contractInstance.upload(
      accounts[2],
      "this is a desc",
      bytes32.digest
    );

    let delist = await contractInstance.delist.call(bytes32.digest);

    assert.equal(delist, expected);
  });

  it("returns details of file", async () => {
    let ipfshash = "Qmbz5g7houBH89C47NGWemErjyi2RgupEjk1q1hTcXVY8U";
    let bytes32 = await getBytes32FromMultiash(ipfshash);
    await contractInstance.upload(
      accounts[2],
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      bytes32.digest
    );

    let getDetails = await contractInstance.getDetails.call(bytes32.digest);
    assert.equal(getDetails[0], accounts[2]);
    assert.equal(
      getDetails[1],
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );
    assert.equal(getDetails[2], 1);
  });
});
