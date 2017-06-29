/**
 * Created by mothw on 6/28/2017.
 */

// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000 ;process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// ==============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/browse", function(req, res) {

//    res.send('testing');


    fs.readFile("./data.json", "utf8", function(err, data){
        if(err) throw err;
        var result = data;
        res.send(data);
    });

//    console.log(req);
    console.log(req.query);

    /*var chosen = req.params.characters;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < characters.length; i++) {
            if (chosen === characters[i].routeName) {
                return res.json(characters[i]);
            }
        }
        return res.json(false);
    }
    return res.json(characters);*/
});


app.get("/create", function(req, res) {


    fs.readFile("./data.json", "utf8", function(err, data){
        if(err) throw err;

        var user = req.query;
        var users = JSON.parse(data);

        console.log('user, users:');
        console.log(user,users);

        if (user.username && !canFind(user,users))
            {
                users.push(req.query);
                fs.writeFile('./data.json', JSON.stringify(users), function (err) {
                    if (err)
                    return console.log(err);
                    console.log('Wrote',req.query,'to','data.json?');
                });
            }

        res.send(data);

    console.log(req.query);

    });
});

function canFind(user,users) {
    var value = false;
    users.forEach(function(item)
         {
             if (item.username == user.username){
             console.log(item,user);
             value = true;
            }   else console.log(item,'is not',user);
         }
        );
    return value;
}


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});