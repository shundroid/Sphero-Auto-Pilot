// モジュールの読み込み
var sphero = require("sphero");
var config = require("./config");
var powerState = require("./powerState");
var keypress = require("keypress");
var timer = require("./timer");

// Spheroの初期化
var orb = sphero(config.serialPort);

var myOrb_degree = 0; // 初期角度 (0-359 度表記)
var collision_num = 0;

var refreshId = -1;

var refreshTime = 5000;

var isNextCollision = false;

var startTime;

/**
 * 曲がります。引数は曲がる角度。省略すると270°になります
 */
function changeDegree(deg) {
    var _deg = (typeof deg === "undefined" ? 270 : deg);
    console.log(_deg);
    myOrb_degree = (myOrb_degree+_deg)%360;
};

/**
 * 衝突時に呼び出されます
 */
function collision() {
  if (isNextCollision) {
    console.log("痛い！");
    changeDegree();
    setRefreshId();
  } else {
    console.log("スキップします");
  }
  orb.color(config.collisionColor);
  roll();
  countCollision();
  setTimeout(function() {
    orb.color(config.defaultColor);
  }, 250);
  isNextCollision = !isNextCollision;
}

/**
 * 衝突した回数を記録し、一定回数衝突し、切断するかどうか判断します
 * （Todo: 関数名英語おかしい？）
 */
function countCollision() {
  collision_num++;
  if(collision_num >= config.collisionLimit) {
    disConnect();
  }
}

/**
 * Spheroとの切断の処理を行います。
 */
function disConnect() {
  orb.color("firebrick");
  orb.disconnect(function() {
      console.log("end");
  });
}

/**
 * 一定時間collisionが呼び出されなかった時の処理を行います。
 */
function refresh() {
  console.log("リフレッシュします");
  orb.color(config.defaultColor);
  changeDegree();
  roll();
  setRefreshId();
}

/**
 * refreshを呼び出すsetTimeoutを設定します。
 */
function setRefreshId() {
  if (refreshId !== -1) {
    clearTimeout(refreshId);
  }
  refreshId = setTimeout(refresh, refreshTime);
}

/**
 * Keypressを初期化します。
 */
function initKeyPress() {
  keypress(process.stdin);
  process.stdin.on("keypress", keyPress);
  process.stdin.setRawMode(true);
  process.stdin.resume();
}

/**
 * Keypressされた時の処理です。
 */
function keyPress(ch, key) {
  if (key.ctrl && key.name === "c") {
    // Ctrl+Cで終了できるようにする
    process.stdin.pause();
    process.exit();
  } else if (key.name === "g") {
    // ゴール時の処理
    var time = timer.getTime(false);
    console.log("Goal Time: " + (time / 1000) + "秒");
    disConnect();
  }
}

/**
 * 現在の角度で動かします
 */
function roll() {
  orb.roll(config.speed, myOrb_degree);
}

/**
 * 接続された時の処理を行います。
 */
function connect() {
  console.log("つながりました");
  orb.color(config.defaultColor);
  orb.detectCollisions();
  orb.on("collision", collision);
  roll();
  setRefreshId();
  timer.start(true);
}
orb.connect(connect);
