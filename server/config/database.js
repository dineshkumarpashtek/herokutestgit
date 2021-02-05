// See also: https://github.com/vitaly-t/pg-promise#initialization-options

var pgp = require("./pgpromise.js");



// Database connection details;
var cn = {
  host: "ec2-3-218-75-21.compute-1.amazonaws.com", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "d8muah1afp73t",
  user: "xikaepnupjihny",
  password: "ed8939f2a3555e38e3ff018e0adb5885463936afffd70c501f6b1d5fcefdf7a3",
  ssl: true
};
console.log('process.env.DATABASE_URL:'+process.env.DATABASE_URL);
//var cn=process.env.DATABASE_URL;
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance; 
db.connect()
    .then(obj => {
        obj.done(); // success, release the connection;
   console.log('obj:'+obj);
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
});
module.exports = db;
