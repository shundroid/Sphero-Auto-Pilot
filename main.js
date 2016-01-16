var sphero = require("sphero");
var orb = sphero("COM7"); // 自分の Sphero の ID に置き換える

var myOrb_color_default = "goldenrod";
var myOrb_color_collision = "mediumspringgreen";

var myOrb_speed = 255; // 速度
var myOrb_degree = 0; // 初期角度 (0-359 度表記)
var collision_limit = 1000; // この回数だけ衝突すると終了
var collision_num = 0;

var setTimeoutId = -1;

var refreshTime = 5000;

var isNextCollision = false;

var startTime;

var keypress = require("keypress");

orb.connect(function() {
  startTime = new Date().getTime();
    console.log("つながりました");
    orb.color(myOrb_color_default);
    orb.detectCollisions();
orb.getPowerState(function(err, data) {
  if (err) {
    console.log("error: ", err);
  } else {
    console.log("data:");
    console.log("  recVer:", data.recVer);
    console.log("  batteryState:", data.batteryState);
    console.log("  batteryVoltage:", data.batteryVoltage);
    console.log("  chargeCount:", data.chargeCount);
    console.log("  secondsSinceCharge:", data.secondsSinceCharge);
  }
});
    // 進行方向の変更
    function changeDegree(deg) {
        var _deg = (typeof deg === "undefined" ? 270 : deg);
        console.log(_deg);
        myOrb_degree = (myOrb_degree+_deg)%360;
    };

    // 衝突時に発生するイベント
    orb.on("collision", function() {
        if (isNextCollision) {
          console.log("痛い！");
          changeDegree();
          if (setTimeoutId !== -1) {
            clearTimeout(setTimeoutId);
          }
          setTimeoutId = setTimeout(refresh, refreshTime);
        } else {
          console.log("スキップします");
        }
        orb.color(myOrb_color_collision);
        orb.roll(myOrb_speed, myOrb_degree);
        collision_num++;
        if(collision_num >= collision_limit) {
          orb.color("firebrick");
          orb.disconnect(function() {
              console.log("end");
          });
        }
        setTimeout(function() {
          orb.color(myOrb_color_default);
        }, 250);
        isNextCollision = !isNextCollision;
    });
    
    function refresh() {
      console.log("リフレッシュします");
      orb.color(myOrb_color_default);
      changeDegree();
      orb.roll(myOrb_speed, myOrb_degree);
      if (setTimeoutId !== -1) {
        clearTimeout(setTimeoutId);
      }
      setTimeoutId = setTimeout(refresh, refreshTime);
    }
    orb.roll(myOrb_speed, myOrb_degree);
    setTimeoutId = setTimeout(refresh, refreshTime);
    
    keypress(process.stdin);
    process.stdin.on("keypress", function(ch, key) {
      if (key.ctrl && key.name === "c") {
        process.stdin.pause();
        process.exit();
      } else if (key.name === "g") {
        var gTime = new Date().getTime();
        console.log("now time: " + gTime)
        console.log("Goal Time: " + ((gTime - startTime) / 1000) + "秒");
        orb.disconnect(function() {
            console.log("end");
        });
      }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
    
    console.log("start time: " + startTime);
});
