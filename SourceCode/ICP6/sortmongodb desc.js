var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://user6:Nitya6@ds263138.mlab.com:63138/webdemo";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webdemo");
    //Sort the result descending by name:
    var sort = { name: -1 };
    dbo.collection("lesson6").find().sort(sort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
    });
});