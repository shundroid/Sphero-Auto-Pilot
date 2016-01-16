/**
 * 接続されてからの時間を計測し、ゴールの処理などを行うモジュール
 */

var startT = 0;

module.exports  = {
  start: function(isPut) {
    startT = new Date().getTime();
    if (isPut) {
      console.log("[Timer] Start time: " + startT);
    }
  },
  /**
   * start時からの経過時間を取得します
   */
  getTime: function(isPut) {
    var time = new Date().getTime();
    if (isPut) {
      console.log("[Timer] Now time: " + time);
      console.log("[Timer] Elapsed time: " + (time - startT));
    }
    return time - startT;
  }
};