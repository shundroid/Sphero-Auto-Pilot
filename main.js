var sphero = require("sphero");
var orb = sphero("COM7"); // 自分の Sphero の ID に置き換える

var myOrb_color_default = "lightseagreen";
var myOrb_color_collision = "goldenrod";

var myOrb_speed = 255; // 速度
var myOrb_degree = 0; // 初期角度 (0-359 度表記)
var collision_limit = 10; // この回数だけ衝突すると終了
var collision_num = 0;



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
        setTimeout(function() {
            orb.color(myOrb_color_default);
        }, 3000);
    });

    orb.roll(myOrb_speed, myOrb_degree);
});
