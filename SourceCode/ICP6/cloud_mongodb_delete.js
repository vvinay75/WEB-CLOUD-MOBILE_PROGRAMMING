var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://user6:Nitya6@ds263138.mlab.com:63138/webdemo';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbase = db.db("webdemo");
    var myquery = { address: 'Main Road 989' };
    dbase.collection("lesson6").deleteOne(myquery, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        db.close();
    });
});