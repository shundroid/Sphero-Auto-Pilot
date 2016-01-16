var sphero = require("sphero");
var orb = sphero("COM7"); // 自分の Sphero の ID に置き換える

var myOrb_color_default = "red";
var myOrb_color_collision = "green";

var myOrb_speed = 255; // 速度
var myOrb_degree = 0; // 初期角度 (0-359 度表記)
var collision_limit = 100; // この回数だけ衝突すると終了
var collision_num = 0;

var setTimeoutId = -1;

var backTime = 10000;

orb.connect(function() {

    orb.color(myOrb_color_default);
    orb.detectCollisions();

    // 進行方向の変更
    function changeDegree() {
        myOrb_degree = (myOrb_degree+90)%360;
    };

    // 衝突時に発生するイベント
    orb.on("collision", function() {
        console.log("痛い！");
        changeDegree();
        orb.color(myOrb_color_collision);
        orb.roll(myOrb_speed, myOrb_degree);
        collision_num++;
        if(collision_num >= collision_limit) {
          orb.color("firebrick");
          orb.disconnect(function() {
              console.log("end");
          });
        }
        if (setTimeoutId !== -1) {
          clearTimeout(setTimeoutId);
        }
        setTimeoutId = setTimeout(goBack, backTime);
        setTimeout(function() {
          orb.color(myOrb_color_default);
        }, 250);
    });
    
    function goBack() {
      console.log("バックします");
      orb.color(myOrb_color_default);
      orb.roll(myOrb_speed, (myOrb_degree + 180) % 360);
    }
    orb.roll(myOrb_speed, myOrb_degree);
    setTimeoutId = setTimeout(goBack, backTime);
});
