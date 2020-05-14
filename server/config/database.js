var pgp = require("./pgpromise.js");
// See also: https://github.com/vitaly-t/pg-promise#initialization-options

// Database connection details;
var cn = {
  host: "ec2-52-201-55-4.compute-1.amazonaws.com", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "davnvh3k6klf7s",
  user: "bkbhaqcyylyucb",
  password: "d49e0804d2b80269c30291fa3d62f0b2010c7f3de5af487560d209abe4090cc7",
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
module.exports = db;
