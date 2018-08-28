import React, { Component } from "react";
import { Table, Grid, Button, Form } from "react-bootstrap";
import ipfs from "./ipfs";

import "./App.css";
import web3 from "./web3";
import noFilter from "./noFilter";
import multihash from "./utils/multihash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: "",
      description: "",
      ipfsHash: null,
      bytes32Hash: null,
      buffer: "",
      blockNumber: "",
      transactionHash: "",
      gasUsed: "",
      txReceipt: "",
      ethAddress: "",
      status: "",
      user: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  captureFile = event => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };

  convertToBuffer = async reader => {
    //file is converted to a buffer to prepare for uploading to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({ buffer });
  };

  updateTable = async () => {
    try {
      this.setState({ blockNumber: "waiting.." });
      this.setState({ gasUsed: "waiting..." });

      // get Transaction Receipt in console on click
      // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
      await web3.eth.getTransactionReceipt(
        this.state.transactionHash,
        (err, txReceipt) => {
          console.log(err, txReceipt);
          this.setState({ txReceipt });
        }
      ); //await for getTransactionReceipt

      await this.setState({ blockNumber: this.state.txReceipt.blockNumber });
      await this.setState({ gasUsed: this.state.txReceipt.gasUsed });
    } catch (error) {
      //try
      console.log(error);
    } //catch
  }; //onClick

  handleChange = event => {
    console.log(event);
    this.setState({ description: event.target.value });
  };

  getHash = async event => {
    event.preventDefault();
    const ethAddress = await noFilter.options.address;
    this.setState({ ethAddress });

    ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });
      let bytes32Hash = multihash.getBytes32FromMultiash(ipfsHash[0].hash);
      this.setState({ bytes32Hash: bytes32Hash.digest });
    });
  };

  saveFile = () => {
    console.log("about to upload");

    noFilter.methods
      .upload(this.state.user, this.state.description, this.state.bytes32Hash)
      .send({ from: this.state.user }, (error, transactionHash) => {
        console.log(transactionHash);
        this.setState({ transactionHash });
      });
    console.log("done");
  };

  async componentDidMount() {
    const owner = await noFilter.methods.owner().call();

    this.setState({ owner });

    const accounts = await web3.eth.getAccounts();
    let user = accounts[0];
    this.setState({ user });

    const ethAddress = await noFilter.options.address;
    this.setState({ ethAddress });
  }

  render() {
    return <div className="App">
        <hr />
        <h1>No Filter</h1>
        <p>V. 0.3.0</p>
        <p><a href="https://github.com/yshuman1/No-Filter">Source Code</a>
        </p>
        <p>
        <a href="https://rinkeby.etherscan.io/address/0x11762bb2c5d76312b51fd396ec947cd752e51343">
          Main Contract
        </a>
        </p>
        <a href="https://rinkeby.etherscan.io/address/0x11762bb2c5d76312b51fd396ec947cd752e51343">
          Registry Contract
        </a>
        <h2> Ethereum and InterPlanetary File System(IPFS)</h2>
        <hr />
        <p>
          Welcome Address:
          <b>{this.state.user}!</b>
        </p>
        <p> This is the beta of No Filter.</p>
        <p>
          The DApp has much more functionality than the front end currently
          exposes.
        </p>
        <p>
          Features available on the contract but not implemented on the
          front end include:
        </p>
        <ul>
          <li>Voting on files</li>
          <li>
            A Second Contract which acts as a registry so that the DApp is
            upgradeable
          </li>
          <li>Owner specific controls</li>
          <li>
            The ability to filter files so as to prevent illegal content
            from being displayed on your front end
          </li>
          <li>
            The ability for a user to look up files by user address as well
            as by IPFS hash and description
          </li>
          <li>
            This contracts not only fires events off when a file is uploaded
            or voted on but also maintains a mapping of file details. In the
            future we plan on making all files searchable as well.
          </li>
        </ul>
        <p> I hope you like it so far! If you have any questions, suggestions or problems email me: email [at] yasin.io </p>
        <hr />
        <Grid>
          <h1>Step 1</h1>
          <h3> Choose file to send to IPFS </h3>
          <Form onSubmit={this.getHash}>
            <input type="file" onChange={this.captureFile} />

            <Button bsStyle="primary" type="submit">
              Save to IPFS
            </Button>
          </Form>

          <p>
            Once Your IPFS Hash is displayed here, proceed to Step 2 (may
            take a minute): {this.state.ipfsHash}
          </p>
          <hr />
          <h1>Step 2</h1>
          <p>Type in a description of your file (mandatory):</p>
          <input type="text" placeholder="description" value={this.state.description} onChange={this.handleChange} />
          <Button bsStyle="primary" type="button" onClick={this.saveFile}>
            Save To Ethereum
          </Button>
        </Grid>
        <h1>Step 3</h1>
        <p>
          Press the button below to retireve all your transactions details.
        </p>
        <Button onClick={this.updateTable}>
          {" "}
          Get Transaction Receipt{" "}
        </Button>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>Tx Receipt Category</th>
              <th>Values</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>File URL </td>
              <td>{`https://ipfs.io/ipfs/${this.state.ipfsHash}`}</td>
            </tr>
            <tr>
              <td>IPFS Hash # </td>
              <td>{this.state.ipfsHash}</td>
            </tr>
            <tr>
              <td>IPFS Hash # stored as a bytes32 on Eth Contract</td>
              <td>{this.state.bytes32Hash}</td>
            </tr>
            <tr>
              <td>File Description Saved to Contract</td>
              <td>{this.state.description}</td>
            </tr>
            <tr>
              <td>Ethereum Contract Address</td>
              <td>{this.state.ethAddress}</td>
            </tr>
            <tr>
              <td>Ethereum Contract Owner Address</td>
              <td>{this.state.owner}</td>
            </tr>
            <tr>
              <td>Tx Hash # </td>
              <td>{this.state.transactionHash}</td>
            </tr>

            <tr>
              <td>Block Number # </td>
              <td>{this.state.blockNumber}</td>
            </tr>

            <tr>
              <td>Gas Used</td>
              <td>{this.state.gasUsed}</td>
            </tr>
          </tbody>
        </Table>
      </div>
  }
}

export default App;
