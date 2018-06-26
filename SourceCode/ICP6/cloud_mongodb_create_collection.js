var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://user6:Nitya6@ds263138.mlab.com:63138/webdemo';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbase = db.db("webdemo");
    dbase.createCollection("lesson6", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});
