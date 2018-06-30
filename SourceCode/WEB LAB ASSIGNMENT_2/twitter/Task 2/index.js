module.exports = require('./node_modules/twitter-node-client/lib/Twitter');

var Twit = require('twit');
var fd = require('fd');

var Tw = new Twit({

    consumer_key: 'w3StlsxDCX4FUa7bh8HRcJgI3',
    consumer_secret: 'CY6qTIMVkwyFQ8hFzbYZFsBHe0k9YyQiAHem4SjMTN5Njp1EQT',
    access_token: '169392370-XwYLB4dglVz9funlQ52LUJjj7tPXOR2IWQuP04EK',
    access_token_secret: 'ckojsDrBlTjz00EIcnFtvt4PyqFkHNd1xYnlZbrys1C7c'

});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var error = function (err, response, body) {
    console.log('ERROR [%s]', JSON.stringify(err));
};
var success = function (data) {
    console.log('Data [%s]', data);
};

var config = {
    "consumer_key": "w3StlsxDCX4FUa7bh8HRcJgI3",
    "consumer_secret": "CY6qTIMVkwyFQ8hFzbYZFsBHe0k9YyQiAHem4SjMTN5Njp1EQT",
    "access_token": "169392370-XwYLB4dglVz9funlQ52LUJjj7tPXOR2IWQuP04EK",
    "access_token_secret": "ckojsDrBlTjz00EIcnFtvt4PyqFkHNd1xYnlZbrys1C7c"
};

var twitt = new module.exports.Twitter(config);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

/*
 * To connect to a front end app (i.e. AngularJS) store all your files you will *
 * statically store in declared below (i.e. ./public) *
*/

app.use(express.static('public'));

//post to retrieve user data
app.post('/twitter/user', function (req, res) {
    var username = req.body.username;
    var twitJSON = {name: username, children: []};
// to get friend list of entered user from twitter server
Tw.get('friends/list', {screen_name: username}, function (err, data, response) {
    if (err) throw err;
    for (var i = 0; i < data['users'].length; i++) {
        var objc = {name: "@" + data['users'][i]['screen_name'], children: []};
        console.log(objc);
        twitJSON.children.push(objc);
    }
    fd.writeFile("C:\\Users\\vvina\\Downloads\\CSEE5590-Web-Cloud-Mobile-master\\CSEE5590-Web-Cloud-Mobile-master\\Part 1 Web Programming\\Lab 3\\Task 2\\public\\input.json", JSON.stringify(twitJSON), function (err) {
        if (err) throw err;
        console.log('Twitter users written to file.');
        // write to console to see whether the JSON file is created with friendlist 
    });
});

//console.log(twitJSON);

    var data1 = twitt.getUser({screen_name: username}, function (error, response, body) {
        res.status(404).send({
            "error": "User Not Found"
        });
    }, function (data1) {
        res.send({
            result: {
                "userData": data1
            }
            // returns the data of the entered user to html file
        });
    });
});


var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
});
