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
 
  
  app.post("/api/createaccount", function (req, res) {
    
    const { customername, phone, salesforceid, website  } = req.body;
    var insertQuery =
      "INSERT INTO account (customername, phone, salesforceid, website) VALUES ('" +
      customername +
      "','" +
      phone + "','" + salesforceid + "','" + webiste +  
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
  });


  

};
