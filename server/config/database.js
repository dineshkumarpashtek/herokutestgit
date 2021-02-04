var pgp = require("./pgpromise.js");
// See also: https://github.com/vitaly-t/pg-promise#initialization-options

// Database connection details;
var cn = {
  host: "ec2-50-19-32-202.compute-1.amazonaws.com", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "d64j8fej8tdh1n",
  user: "oxgzetlxlllbrb",
  password: "002d068877e057229cf86302cf7cf74d1d50b85e4942c6eac552e453f03466a2",
  ssl: true
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance;
module.exports = db;
