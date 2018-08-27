import web3 from "./web3";

const address = "0x11762bb2c5d76312b51fd396ec947cd752e51343";

const abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "details",
      "outputs": [
        {
          "name": "uploaderId",
          "type": "address"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "vote",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "ipfsHash",
          "type": "bytes32"
        },
        {
          "indexed": false,
          "name": "vote",
          "type": "int256"
        }
      ],
      "name": "Vote",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "uploaderId",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "ipfsHash",
          "type": "bytes32"
        }
      ],
      "name": "Alert",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "ipfsHash",
          "type": "bytes32"
        }
      ],
      "name": "upVote",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "ipfsHash",
          "type": "bytes32"
        }
      ],
      "name": "downVote",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_uploaderId",
          "type": "address"
        },
        {
          "name": "_description",
          "type": "string"
        },
        {
          "name": "ipfsHash",
          "type": "bytes32"
        }
      ],
      "name": "upload",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "ipfsHash",
          "type": "bytes32"
        }
      ],
      "name": "delist",
      "outputs": [
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "ipfsHash",
          "type": "bytes32"
        }
      ],
      "name": "getDetails",
      "outputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "string"
        },
        {
          "name": "",
          "type": "int256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "kill",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

export default new web3.eth.Contract(abi, address);
