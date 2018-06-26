var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://user6:Nitya6@ds263138.mlab.com:63138/webdemo";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("webdemo");
    dbo.collection('lesson7').aggregate([
        { $lookup:
                {
                    from: 'lesson6',
                    localField: 'lesson6_name',
                    foreignField: '_name',
                    as: 'lesson8'
                }
        }
    ]).toArray(function(err, res) {
        if (err) throw err;
        console.log(JSON.stringify(res));
        db.close();
    });
});