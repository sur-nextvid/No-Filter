var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic =
  "candy nurse tail loyal sponsor stamp melody two giraffe habit end basket";
var API_KEY = "kLmQKp11UfVGT6Ocdlc0";

module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    solc: {
      optimizer: {
        enabled: true,
        runs: 500
      }
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/" + API_KEY
        );
      },
      network_id: 4,
      gas: 4612388
    }
  }
};
