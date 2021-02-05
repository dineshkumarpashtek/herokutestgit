// See also: https://github.com/vitaly-t/pg-promise#initialization-options
var options = {
    error: function (error, e) {
        if (e.cn) {
            // A connection-related error;
            console.log("CN:", e.cn);
            console.log("EVENT:", error.message);
        }
    }
};
var pgp = require("./pgpromise.js")(options);

const db = pgp('invalid connection string');


// Database connection details;
/*var cn = {
  host: "ec2-3-218-75-21.compute-1.amazonaws.com", // 'localhost' is the default;
  port: 5432, // 5432 is the default;
  database: "d8muah1afp73t",
  user: "xikaepnupjihny",
  password: "ed8939f2a3555e38e3ff018e0adb5885463936afffd70c501f6b1d5fcefdf7a3",
  ssl: true
};
// You can check for all default values in:
// https://github.com/brianc/node-postgres/blob/master/lib/defaults.js
var db = pgp(cn); // database instance; */
db.connect()
    .then(obj => {
        obj.done(); // success, release the connection;
    })
    .catch(error => {
        console.log('ERROR:', error.message || error);
    });
module.exports = db;
