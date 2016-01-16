module.exports = function() {
  return new Promise(resolve => {
    orb.getPowerState(function(err, data) {
      if (err) {
        console.log("error: ", err);
      } else {
        resolve(data);
      }
    });
  });
}