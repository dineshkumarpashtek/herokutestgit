var pgp = require("./pgpromise.js");
// See also: https://github.com/vitaly-t/pg-promise#initialization-options

// Database connection details;
var cn = {
  host: "ec2-3-218-75-21.compute-1.amazonaws.com", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "d8muah1afp73t",
  user: "xikaepnupjihny",
  password: "ed8939f2a3555e38e3ff018e0adb5885463936afffd70c501f6b1d5fcefdf7a3",
  ssl: true
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
console.log('db:'+db);
module.exports = db;
