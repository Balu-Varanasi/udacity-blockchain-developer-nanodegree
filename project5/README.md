## Project overview

Build additional functionality with your smart contract and deploy it on the public testnet to create a DApp.

## Project specification 

https://review.udacity.com/#!/rubrics/2297/view

## console output
```bash
➜  smart_contracts git:(master) truffle migrate --network rinkeby --reset --compile-all        
Compiling ./contracts/Migrations.sol...
Compiling ./contracts/StarNotary.sol...
Compiling openzeppelin-solidity/contracts/introspection/ERC165.sol...
Compiling openzeppelin-solidity/contracts/introspection/IERC165.sol...
Compiling openzeppelin-solidity/contracts/math/SafeMath.sol...
Compiling openzeppelin-solidity/contracts/token/ERC721/ERC721.sol...
Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721.sol...
Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol...
Compiling openzeppelin-solidity/contracts/utils/Address.sol...
Writing artifacts to ./build/contracts

Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Replacing Migrations...
  ... 0x1a6ae78d7a10aabbf3bb6460495c4bbd025d8df45b1598df183ace2f3f2cef50
  Migrations: 0xcd241edef5509c53a9fe1b2d3f33f6801d1725d8
Saving successful migration to network...
  ... 0x316b376fae10650e832c1021cf8840a3513c256ae1845a2b47d4d61f7a8752e8
Saving artifacts...
Running migration: 2_deploy_star_notary.js
  Replacing StarNotary...
  ... 0xe8163b8e6941ba1c6743b1402dbdc1d24c28f90df2e565a0cac1fdeb3685d322
  StarNotary: 0x31709061edbcf70936ad634cb7e4b58cc93fa4e9
Saving successful migration to network...
  ... 0x935deee2eb8d86bc45b70639be58f51c27f7ac4c2a5516274e1ba9488ffc2d31
Saving artifacts...
```

## contract address
0x31709061edbcf70936ad634cb7e4b58cc93fa4e9
https://rinkeby.etherscan.io/address/0x31709061edbcf70936ad634cb7e4b58cc93fa4e9

## contract hash
0xe8163b8e6941ba1c6743b1402dbdc1d24c28f90df2e565a0cac1fdeb3685d322
https://rinkeby.etherscan.io/tx/0xe8163b8e6941ba1c6743b1402dbdc1d24c28f90df2e565a0cac1fdeb3685d322

## transaction hash
0x7cfb2df820d083409499e737d6251fb204d1f2947ec73ecd4bf7fcc081d00ab3
https://rinkeby.etherscan.io/tx/0x7cfb2df820d083409499e737d6251fb204d1f2947ec73ecd4bf7fcc081d00ab3


## star tokenId
1

## Udacity honor code

Giving credits for places that helped me to do this project
- Udacity
