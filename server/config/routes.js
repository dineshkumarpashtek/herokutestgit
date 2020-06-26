var jsforce = require("jsforce");

// Salesforce OAuth2 client information
var conn = new jsforce.Connection({
  oauth2: {
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: "https://login.salesforce.com",
    clientId: process.env.Consumer_Key,
    clientSecret: process.env.Consumer_Secret,
    redirectUri: process.env.Callback_URL,
  },
});

//all the routes for our application
module.exports = function (app, db, pgp) {
  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
 
  
  app.get("/api/getJourneyByID", function (req, res) {
    //res.render("index.ejs"); // load the index.ejs file
    var query = "SELECT * FROM journey";
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

app.post("/api/getJourneyByKey", function (req, res) {
    //res.render("index.ejs"); // load the index.ejs file
  //var a=req.body;
  const { journey_key } = req.body;
  //const {Journeykey}='ixn-created-Meeting-Executed-api';
  console.log('req.body:'+req.body);
  console.log('journey_key:'+journey_key);
  const results = [];
    var query = "SELECT * FROM journey where journey_key = '" + journey_key + "'";
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
  
 app.get("/api/updatecustomerjourney", function (req, res) {
    //res.render("index.ejs"); // load the index.ejs file
   var customer_key  = 'welath001';
   var journey_key ='ixn-created-Meeting-Executed-api';
   console.log('customer_key:'+customer_key);
   var customerquery="SELECT name,salesforceid,customer_key FROM customer where customer_key = '" + customer_key + "'"
    db.query(customerquery, true)
      .then(function (data) {
      var customer_id=data[0].salesforceid;
      console.log('customerid:'+customer_id);
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
   
   var journeyquery = "SELECT * FROM journey where journey_key = '" + journey_key + "'";
    db.query(journeyquery, true)
      .then(function (data) {
      var journey_id=data[0].ojourneyid;
      console.log('journey_id:'+journey_id);
       // return res.json(data);
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
    
       
   var customerjourneyquery= "SELECT * FROM journey";
    db.query(customerjourneyquery, true)
      .then(function (data) {
      var customer_journey_id=data[0].ojourneyid;
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
   console.log('customerid:'+customer_id);
    console.log('journey_id:'+journey_id);
   console.log('customer_journey_id:'+customer_journey_id);
   if(customer_journey_id !== journey_id){
   var insertQuery =
      "INSERT INTO customer_journey (customer_id, journey_id) VALUES ('" +
      customer_id +
      "','" +
      journey_id +
      "')";
    db.query(insertQuery, true)
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
   }
   });
 

  
  
};

