/* ===== SHA256 with Crypto-js ===============================
|  Learn more: Crypto-js: https://github.com/brix/crypto-js  |
|  =========================================================*/

const SHA256 = require('crypto-js/sha256');
const Block = require('./block');

/**
 * Requirement 1	Configure LevelDB to persist dataset
 * Criteria: Configure simpleChain.js with levelDB to persist blockChain dataset using the level Node.js library.
 */
const levelDBServiceHandler = require('./levelDBService');

/* ===== BlockChain Class ==========================
|  Class with a constructor for new blockChain 		|
|  ================================================*/

class BlockChain {
  constructor() {
    /**
     * Requirement 2	Modify simpleChain.js functions to persist data with LevelDB
     * Criteria: Genesis block persist as the first block in the blockChain using LevelDB.
     */
    this.getBlockHeight().then((height) => {
      if (height === -1) {
        let newBlock = new Block("First block in the chain - Genesis block");
        this.addBlock(newBlock).then(() => console.log("Genesis block added!"));
      }
    });
  }

  /**
   * Requirement 2	Modify simpleChain.js functions to persist data with LevelDB
   * Criteria: addBlock(newBlock) function includes a method to store newBlock with LevelDB.
   *
   * @param {Block} newBlock
   */
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
  /**
   * Requirement 3	Modify getBlock() function
   * Criteria: Modify getBlock() function to retrieve a block by it's block height within the LevelDB chain.
   *
   * @param {int} blockHeight
   */
  async getBlock(blockHeight) {
    return JSON.parse(await levelDBServiceHandler.getBlockFromDB(blockHeight));
  }

  /**
   * Requirement 4	Modify getBlockHeight() function
   * Criteria: Modify getBlockHeight() function to retrieve current block height within the LevelDB chain.
   */
  async getBlockHeight() {
    return await levelDBServiceHandler.getBlockHeightFromDB();
  }

  /**
   * Requirement 5	Modify validate functions
   * Criteria: Modify the validateBlock() function to validate a block stored within levelDB.
   *
   * @param {int} blockHeight
   */
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

  /**
   * Requirement 5	Modify validate functions
   * Criteria: Modify the validateChain() function to validate blockChain stored within levelDB.
   */
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
