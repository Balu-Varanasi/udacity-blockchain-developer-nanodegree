const SHA256 = require('crypto-js/sha256');
const Block = require('./block');

const levelDBServiceHandler = require('./levelDBService');

class BlockChain {
  constructor() {
    this.getBlockHeight().then((height) => {
      if (height === -1) {
        let newBlock = new Block("First block in the chain - Genesis block");
        this.addBlock(newBlock).then(() => console.log("Genesis block added!"));
      }
    });
  }

  async addBlock(newBlock) {
    // Block height
    const height = await this.getBlockHeight();
    newBlock.height = height + 1;

    // UTC timestamp
    newBlock.time = new Date().getTime().toString().slice(0, -3);

    // previous block hash
    if (newBlock.height > 0) {
      const prevBlock = await this.getBlock(height);
      newBlock.previousBlockHash = prevBlock.hash;
      console.log(`Previous hash: ${newBlock.previousBlockHash}`);
    }
    // Block hash with SHA256 using newBlock and converting to a string
    newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    console.log(`New hash: ${newBlock.hash}`);

    // Adding block object to chain
    await levelDBServiceHandler.addBlockToDB(newBlock.height, JSON.stringify(newBlock));
  }

  async getBlock(blockHeight) {
    return JSON.parse(await levelDBServiceHandler.getBlockFromDB(blockHeight));
  }

  async getBlockHeight() {
    return await levelDBServiceHandler.getBlockHeightFromDB();
  }

  async getBlockByHeight(height) {
    return await levelDBServiceHandler.getBlockByHeight(height);
  }

  async getBlockByHash(hash) {
    return await levelDBServiceHandler.getBlockByHash(hash);
  }

  async getBlocksByAddress(address) {
    return await  levelDBServiceHandler.getBlocksByAddress(address);
  }

  async validateBlock(blockHeight) {
    // get block object
    let block = await this.getBlock(blockHeight);
    // get block hash
    let blockHash = block.hash;
    // remove block hash to test block integrity
    block.hash = '';
    // generate block hash
    let validBlockHash = SHA256(JSON.stringify(block)).toString();
    // Compare
    if (blockHash === validBlockHash) {
      return true;
    } else {
      console.log(`Block #${blockHeight} invalid hash: ${blockHash} <> ${validBlockHash}`);
      return false;
    }
  }

  async validateChain() {
    let errorLog = [];
    let previousHash = '';

    const height = await this.getBlockHeight();
    for (let i = 0; i < height + 1; i++) {
      let block = await this.getBlock(i);
      if (!this.validateBlock(block.height)) {
        errorLog.push(i)
      }
      if (block.previousBlockHash !== previousHash) {
        errorLog.push(i)
      }
      previousHash = block.hash
    }
    if (errorLog.length > 0) {
      console.log(`Block errors = ${errorLog.length}`);
      console.log(`Blocks: ${errorLog}`);
    } else {
      console.log('No errors detected');
    }
  }
}

module.exports = BlockChain;
