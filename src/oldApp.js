import React, { Component } from "react";
import { Table, Grid, Button, Form } from "react-bootstrap";
import web3 from "./web3";

import "./css/oswald.css";
import "./css/open-sans.css";
import "./css/pure-min.css";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAccount: null,
      web3: null,
      currentContract: null,
      ipfsHash: null,
      buffer: "",
      ethAddress: "",
      blockNumber: "",
      transactionHash: "",
      gasUsed: "",
      txReceipt: ""
    };
  }

  componentWillMount() {
    getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        });

        this.instantiateRegistryContract();
        this.instantiateNoFilterContract();
      })
      .catch(() => {
        console.log("Error finding web3.");
      });
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

  onClick = async () => {
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

  onSubmit = async event => {
    event.preventDefault();

    //bring in user's metamask account address
    const accounts = await web3.eth.getAccounts();

    console.log("Sending from Metamask account: " + accounts[0]);

    //obtain contract address from storehash.js
    const ethAddress = await storehash.options.address;
    this.setState({ ethAddress });

    //save document to IPFS,return its hash#, and set hash# to state
    //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
    await ipfs.add(this.state.buffer, (err, ipfsHash) => {
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash
      this.setState({ ipfsHash: ipfsHash[0].hash });

      // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract
      //return the transaction hash from the ethereum contract
      //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send

      storehash.methods.sendHash(this.state.ipfsHash).send(
        {
          from: accounts[0]
        },
        (error, transactionHash) => {
          console.log(transactionHash);
          this.setState({ transactionHash });
        }
      ); //storehash
    }); //await ipfs.add
  }; //onSubmit

  instantiateRegistryContract() {
    const contract = require("truffle-contract");
    const NoFilterRegistry = contract(NoFilterRegistryJ);
    NoFilterRegistry.setProvider(this.state.web3.currentProvider);

    var registryInstance;

    this.state.web3.eth.getAccounts((error, accounts) => {
      this.setState({ selectedAccount: accounts[0] });
      NoFilterRegistry.deployed()
        .then(instance => {
          registryInstance = instance;
          return registryInstance.getBackendContract();
        })
        .then(result => {
          return this.setState({ currentContract: result });
        });
    });
  }

  instantiateNoFilterContract() {
    const contract = require("truffle-contract");
    const NoFilter = contract(NoFilterJ);
    NoFilter.setProvider(this.state.web3.currentProvider);

    var noFilterInstance;

    this.state.web3.eth.getAccounts((error, accounts) => {
      NoFilter.deployed()
        .then(instance => {
          noFilterInstance = instance;
          return noFilterInstance.allEvents();
        })
        .then(result => {
          console.log(result);
        });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Ethereum and InterPlanetary File System(IPFS) with Create React App
          </h1>
        </header>

        <hr />

        <Grid>
          <h3> Choose file to send to IPFS </h3>
          <Form onSubmit={this.onSubmit}>
            <input type="file" onChange={this.captureFile} />
            <Button bsStyle="primary" type="submit">
              Send it
            </Button>
          </Form>

          <hr />
          <Button onClick={this.onClick}> Get Transaction Receipt </Button>

          <Table bordered responsive>
            <thead>
              <tr>
                <th>Tx Receipt Category</th>
                <th>Values</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>IPFS Hash # stored on Eth Contract</td>
                <td>{this.state.ipfsHash}</td>
              </tr>
              <tr>
                <td>Ethereum Contract Address</td>
                <td>{this.state.ethAddress}</td>
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
        </Grid>
      </div>
    );
  }
}

export default App;
