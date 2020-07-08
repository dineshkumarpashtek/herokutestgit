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

  app.post("/api/GetCreativeByKey", function (req, res) {
    //res.render("index.ejs"); // load the index.ejs file
  //var a=req.body;
  const { creative_key } = req.body;
  //const {Journeykey}='ixn-created-Meeting-Executed-api';
  console.log('req.body:'+req.body);
  console.log('creative_key:'+creative_key);
    var query = "SELECT * FROM creative where templatekey = '" + creative_key + "'";
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
  
 app.post("/api/updatecustomerjourney", function (req, res) {
    //res.render("index.ejs"); // load the index.ejs file
   const{ journey_key, customer_key} = req.body;
  // var customer_key  = 'welath001';
   //var journey_key ='ixn-created-Meeting-Executed-api';
   var customer_id;
   var journey_id;
   var customer_journey_id;
   console.log('customer_key:'+customer_key);
   console.log('journey_key:'+journey_key);
   
   var customerquery="SELECT name,salesforceid,customer_key FROM customer where customer_key = '" + customer_key + "'"
    db.query(customerquery, true)
      .then(function (data) {
      customer_id=data[0].salesforceid;
      console.log('customerid:'+customer_id);
      var journeyquery = "SELECT * FROM journey where journey_key = '" + journey_key + "'";
      db.query(journeyquery, true)
      .then(function (data) {
      journey_id=data[0].ojourneyid;
      console.log('journey_id:'+journey_id);
       // return res.json(data);
      var customerjourneyquery= "SELECT * FROM customer_journey";
      db.query(customerjourneyquery, true)
      .then(function (data) {
      console.log('data:'+data);
      if(data.length > 0){  
        for(var i=0;i<data.length;i++){
          console.log('inside for loop:'+data[i].journey_id);
         if(data[i].customer_id === customer_id && data[i].journey_id !== journey_id){
         console.log('inside if condtion:'+data[i].journey_id);
           customer_journey_id=data[i].journey_id;
      console.log('customer_journey_id:'+customer_journey_id);
         }
        }
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
      }
      }
       else{
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
      }
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
   .finally(function () {
        pgp.end(); // for immediate app exit, closing the connection pool.
      });
   
   });
 app.post("/api/updatecustomerTemplate", function (req, res) {
    //res.render("index.ejs"); // load the index.ejs file
   const{ Template_key, customer_key} = req.body;
  // var customer_key  = 'welath001';
   //var journey_key ='ixn-created-Meeting-Executed-api';
   var customer_id;
   var creative_id;
   var customer_creative_id;
   var journey_id;
   console.log('customer_key:'+customer_key);
   console.log('Template_key:'+Template_key);
   console.log('customer_creative_id:'+customer_creative_id);
   
   var customerquery="SELECT name,salesforceid,customer_key FROM customer where customer_key = '" + customer_key + "'"
    db.query(customerquery, true)
      .then(function (data) {
      customer_id=data[0].salesforceid;
      console.log('customerid:'+customer_id);
      var creativequery = "SELECT * FROM creative where templatekey = '" + Template_key + "'";
      db.query(creativequery, true)
      .then(function (data) {
      creative_id=data[0].salesforceid;
      journey_id=data[0].journey_id;   
      console.log('creative_id:'+creative_id);
      console.log('journey_id:'+journey_id);  
       // return res.json(data);
      var customertemplatequery= "select * from customer_creative where customerid ='" + customer_id +"' And creativeid = '" + creative_id+ "' ";
      db.query(customertemplatequery, true)
      .then(function (data) {
      console.log('data:'+data);
        if(data.length == 0){
      var insertQuery =
      "INSERT INTO customer_creative (customerid, journeyid, creativeid) VALUES ('" +
      customer_id +
      "','" +
      journey_id +
      "','" +
      creative_id +  
      "')";
      
      db.query(insertQuery, true)
      .then(function (data) {
       return res.json(data);
      })
        .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
      }
        else{
          return res.json(data);
        }
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
      })
      .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
   .finally(function () {
        pgp.end(); // for immediate app exit, closing the connection pool.
      });
   
   });
 
   app.post("/api/getExtensionKey", function (req, res) {
   const { Extension_Key } = req.body;
  console.log('Extension_Key:'+Extension_Key);  
  const results = [];
    var query = "SELECT * FROM Data_Extension_Field where Data_Extension_Key = '" + Extension_Key + "' ";
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
  
 app.post("/api/updateJourneyExtension", function (req, res) {
   const { Extension_Key,Data_Extension_Id,Journey_Id } = req.body;
  console.log('Extension_Key:'+Extension_Key);
   console.log('Data_Extension_Id:'+Data_Extension_Id);
   console.log('Journey_Id:'+Journey_Id);
   
   var query = "SELECT * FROM journey_data_extension where dataextensionid = '" + Data_Extension_Id + "' And journeyid = '" + Journey_Id+ "' ";
     db.query(query, true)
      .then(function (data) {
      console.log('data:'+data);
        if(data.length == 0){
      var insertQuery =
      "INSERT INTO journey_data_extension (dataextensionid, journeyid) VALUES ('" +
      Data_Extension_Id +
      "','" +
      Journey_Id +
      "')";
      
      db.query(insertQuery, true)
      .then(function (data) {
       return res.json(data);
      })
        .catch(function (err) {
        console.log("ERROR:", err); // print the error;
        return res.status(400).json({ success: false, error: err });
      })
      }
        else{
          return res.json(data);
        }
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

