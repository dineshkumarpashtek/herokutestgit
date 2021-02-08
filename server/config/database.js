// See also: https://github.com/vitaly-t/pg-promise#initialization-options

/*var pgp = require("./pgpromise.js");



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
console.log('process.env.RACK_ENV:'+process.env.RACK_ENV);
//var cn=process.env.DATABASE_URL;
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance; 

module.exports = db; */

const { Client } = require('pg');
const connectionString = 'postgres://xikaepnupjihny:ed8939f2a3555e38e3ff018e0adb5885463936afffd70c501f6b1d5fcefdf7a3@ec2-3-218-75-21.compute-1.amazonaws.com:5432/d8muah1afp73t';

const client = new Client({
    connectionString: connectionString,
    statement_timeout: 10000,
    query_timeout: 15000,
    connectionTimeoutMillis: 15000

});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected');
  })

module.exports = client;
