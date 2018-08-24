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
    let ipfshash = "Qmbz5g7houBH89C47NGWemErjyi2RgupEjk1q1hTcXVY8U";
    let bytes32 = await getBytes32FromMultiash(ipfshash);
    await contractInstance.upload(
      accounts[2],
      "this is a desc",
      [
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken"
      ],
      bytes32.digest
    );

    let upVote = await contractInstance.upVote.call(bytes32.digest);
    assert.equal(upVote, expected);
  });

  it("will decrease the vote on file by one", async () => {
    let expected = -1;
    let ipfshash = "Qmbz5g7houBH89C47NGWemErjyi2RgupEjk1q1hTcXVY8U";
    let bytes32 = await getBytes32FromMultiash(ipfshash);
    await contractInstance.upload(
      accounts[2],
      "this is a desc",
      [
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken"
      ],
      bytes32.digest
    );

    let downVote = await contractInstance.downVote.call(bytes32.digest);

    assert.equal(downVote, expected);
  });

  it("will delist file by ", async () => {
    let expected = -1000;
    let ipfshash = "Qmbz5g7houBH89C47NGWemErjyi2RgupEjk1q1hTcXVY8U";
    let bytes32 = await getBytes32FromMultiash(ipfshash);
    await contractInstance.upload(
      accounts[2],
      "this is a desc",
      [
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken"
      ],
      bytes32.digest
    );

    let delist = await contractInstance.delist.call(bytes32.digest);

    assert.equal(delist, expected);
  });

  it("updates tags", async () => {
    let ipfshash = "Qmbz5g7houBH89C47NGWemErjyi2RgupEjk1q1hTcXVY8U";
    let bytes32 = await getBytes32FromMultiash(ipfshash);
    await contractInstance.upload(
      accounts[2],
      "this is a desc",
      [
        "0x",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0xchicken",
        "0x",
        "0x",
        "0xrooster",
        "0x"
      ],
      bytes32.digest
    );

    let expected = [
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken"
    ];

    let updateTags = await contractInstance.updateTags.call(bytes32.digest, [
      "0xrooster",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken",
      "0xchicken"
    ]);
    console.log(updateTags);
    console.log(expected);
    assert.equal(updateTags, expected);
  });

  it("returns details of file", async () => {});
});
