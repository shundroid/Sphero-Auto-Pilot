var keypress = require("keypress");
module.exports = {
  init: function(keyPressCallback) {
    keypress(process.stdin);
    process.stdin.on("keypress", keyPressCallback);
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
};