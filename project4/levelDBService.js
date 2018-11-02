/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './data/chain';
const db = level(chainDB);

const levelDBServiceHandler = {

  // Level db functions
  isGenesis (key) {
    return parseInt(key) === 0
  },

  addBlockToDB: (key, value) => new Promise((resolve, reject) => {
    db.put(key, value, (error) => {
      if (error) {
        reject(error)
      }
      console.log(`Added block #${key}`);
      resolve(`Added block #${key}`);
    })
  }),

  getBlockFromDB: (key) => new Promise((resolve, reject) => {
    db.get(key, (error, value) => {
      if (error) {
        reject(error)
      }
      resolve(value)
    })
  }),

  getBlockHeightFromDB: () => new Promise((resolve, reject) => {
    let height = -1;
    db.createReadStream().on('data', (data) => {
      height++
    }).on('error', (error) => {
      reject(error)
    }).on('close', () => {
      resolve(height)
    })
  }),

  getBlockByHeight: (height) => new Promise((resolve, reject) => {
    db.get(height, (error, value) => {
      if (value === undefined) {
        return reject('Not found')
      } else if (error) {
        return reject(error)
      }

      value = JSON.parse(value);

      if (parseInt(height) > 0) {
        value.body.star.storyDecoded = new Buffer(value.body.star.story, 'hex').toString()
      }

      return resolve(value)
    })
  }),

  getBlockByHash: (hash) => {
    let block;

    return new Promise((resolve, reject) => {
      db.createReadStream().on('data', (data) => {
        block = JSON.parse(data.value);

        if (block.hash === hash) {
          if (!levelDBServiceHandler.isGenesis(data.key)) {
            block.body.star.storyDecoded = new Buffer(block.body.star.story, 'hex').toString();
            return resolve(block)
          } else {
            return resolve(block)
          }
        }
      }).on('error', (error) => {
        return reject(error);
      }).on('close', () => {
        return reject('Not found');
      })
    })
  },

  getBlocksByAddress: (address) => {
    const blocks = [];
    let block;

    return new Promise((resolve, reject) => {
      db.createReadStream().on('data', (data) => {
        // Don't check the genesis block
        if (!levelDBServiceHandler.isGenesis(data.key)) {
          block = JSON.parse(data.value);

          if (block.body.address === address) {
            block.body.star.storyDecoded = new Buffer(block.body.star.story, 'hex').toString();
            blocks.push(block)
          }
        }
      }).on('error', (error) => {
        return reject(error)
      }).on('close', () => {
        return resolve(blocks)
      })
    })
  }

};

module.exports = levelDBServiceHandler;
