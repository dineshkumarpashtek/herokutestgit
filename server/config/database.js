var pgp = require("./pgpromise.js");
// See also: https://github.com/vitaly-t/pg-promise#initialization-options

// Database connection details;
var cn = {
  host: "ec2-54-224-175-142.compute-1.amazonaws.com", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "dqdr7n4bhcomf",
  user: "ynrcoexcfruxng",
  password: "1115a1c7a2f7e9dedf6bf928e554e0fdfc20a69b24d6cbec0c5997532628646b",
  ssl: true
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
module.exports = db;
