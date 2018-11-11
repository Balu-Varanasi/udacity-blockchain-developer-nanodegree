## Project overview

Build additional functionality with your smart contract and deploy it on the public testnet to create a DApp.

## Project specification 

https://review.udacity.com/#!/rubrics/2297/view

## console output

➜  smart_contracts git:(master) ✗ truffle compile
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

➜  smart_contracts git:(master) ✗ truffle deploy --network rinkeby                                                      
Using network 'rinkeby'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  ... 0x1c80f385485a8539a491f162afbfee346b47010d277c61cc791f8ccb776a950b
  Migrations: 0xf8b5d27c27a586de52a6688698ddbc7b1b27045e
Saving successful migration to network...
  ... 0x8af60333eeb20934b1253f9f02a5c8ede4c071b819be7f6a3692054041e0ce14
Saving artifacts...
Running migration: 2_deploy_star_notary.js
  Deploying StarNotary...
  ... 0x986934ddab3b6f698901f0640a071c97915f95b2b7ef4ff9389e3fe3529a01cc
  StarNotary: 0x833b12a5e66af7c293bcab84c0bcce9b74fb0526
Saving successful migration to network...
  ... 0x8c28c862fd918da02b9336ff051a6a807e374b5cbfe6284e960fc0d3062002cd

## contract address
0xaf409dcf81b728c42571567370ca39fc20096f94
https://rinkeby.etherscan.io/address/0xaf409dcf81b728c42571567370ca39fc20096f94

## contract hash
0x986934ddab3b6f698901f0640a071c97915f95b2b7ef4ff9389e3fe3529a01cc
https://rinkeby.etherscan.io/tx/0x986934ddab3b6f698901f0640a071c97915f95b2b7ef4ff9389e3fe3529a01cc

## transaction hash
0x8c28c862fd918da02b9336ff051a6a807e374b5cbfe6284e960fc0d3062002cd
https://rinkeby.etherscan.io/tx/0x8c28c862fd918da02b9336ff051a6a807e374b5cbfe6284e960fc0d3062002cd

## star tokenId
1

## Udacity honor code

Giving credits for places that helped me to do this project
- Udacity
