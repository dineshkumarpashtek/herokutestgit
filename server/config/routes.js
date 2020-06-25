var jsforce = require("jsforce");

// Salesforce OAuth2 client information


//all the routes for our application
module.exports = function (app, db, pgp) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
 
  
  

app.get("/api/getJourneyByKey", function (req, res) {
    //res.render("index.ejs"); // load the index.ejs file
  const {Journeykey}=req.body;
  const results = [];
    var query = "SELECT * FROM journey where Journey_key=${Journeykey}";
    db.query(query, true)
      .then(function (data) {
        return res.json(data);
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
   .finally(function () {
        pgp.end(); // for immediate app exit, closing the connection pool.
      });
  });
  
  app.get("/api/getTemplateByKey", function (req, res) {
    //res.render("index.ejs"); // load the index.ejs file
  const results = [];
    var query = "SELECT * FROM orkestra_Templates";
    db.query(query, true)
      .then(function (data) {
        return res.json(data);
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
   .finally(function () {
        pgp.end(); // for immediate app exit, closing the connection pool.
      });
  });
  

};
