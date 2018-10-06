const Block = require('./block');
const BlockChain = require('./blockchain');

let blockChain = new BlockChain();

(function theLoop(i) {
  setTimeout(() => {
    blockChain.addBlock(new Block(`Test data ${i}`)).then(() => {
      if (--i) {
        theLoop(i);
      }
    })
  }, 100);
})(10);

setTimeout(() => blockChain.validateChain(), 2000);
