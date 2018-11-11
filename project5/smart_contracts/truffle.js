var HDWalletProvider = require('truffle-hdwallet-provider');

var mnemonic = 'tackle bacon moral odor inmate icon platinum gold vendor forest hike advance';

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/70b47129c8874ed4a9dc8f41df42b09f')
      },
      network_id: 4,
      gas: 6700000,
      gasPrice: 10000000000
    }
  }
};
