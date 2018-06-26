/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://user6:Nitya6@ds263138.mlab.com:63138/webdemo';

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbase = db.db("webdemo");
    dbase.dropCollection("lesson6", function(err, delOK) {
        if (err) throw err;
        if (delOK) console.log("Collection deleted");
        db.close();
    });
});