var pgp = require("./pgpromise.js");
// See also: https://github.com/vitaly-t/pg-promise#initialization-options

// Database connection details;
var cn = {
  host: "ec2-52-2-6-71.compute-1.amazonaws.com", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "d3832nsu7rn40c",
  user: "juxczxfqqiluwr",
  password: "ad7df772bb90389b6689438f8045b4b2f06976ee28e4e3aa6356e7802e3fcfaf",
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
module.exports = db;
