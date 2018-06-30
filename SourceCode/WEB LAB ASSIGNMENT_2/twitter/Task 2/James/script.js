var Twit = require('twit');
var fs = require('fs');

var T = new Twit({

    consumer_key: 'RFgBoK4ZioKHlDVesZ2EbBjJp',
    consumer_secret: '7wnwY51LrRS6AtyJMGrDi7yXpSNEHMcNLcjHspieFlwQztMBjz',
    access_token: '477630074-nOdC9Nb7GAh8VgdOEbkT44Z9geWQyqxZncI0DcaF',
    access_token_secret: 'Pb7PLjd7jyyW2P0e8IMO4xHe0QwBDRTUvhqSZugR1Rl3Q'

});

//
//  get the list of user id's that follow @3guysinagarage
//
var twitJSON = {name: "@liaquat85", children: []};

T.get('friends/list', { screen_name: 'liaquat85' },  function (err, data, response) {
    if (err) throw err;
    for(var i = 0;i < data['users'].length; i++){
        var obj = {name : "@" + data['users'][i]['screen_name'], children: []};
        console.log(obj);
        twitJSON.children.push(obj);
    }
    fs.writeFile ("input.json", JSON.stringify(twitJSON), function(err) {
        if (err) throw err;
        console.log('Twitter users written to file.');
    });
});

console.log(twitJSON);
