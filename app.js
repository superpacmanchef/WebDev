var express = require("express"),
path = require("path"),
mustache = require("mustache-express"),
controller = require('./Controller/controller.js') ; 

var app = express();

app.set('port' , process.env.PORT || 3000);
app.engine('mustache' , mustache()) ; 

app.set('view engine' , 'mustache');

var staticPath = path.resolve(__dirname, "");
console.log("static path is " + staticPath) ; 

app.use(express.static(staticPath));

app.use(express.urlencoded({ extended: true }));

app.use('/' , controller);

app.listen(app.get('port') , function(){
    console.log("server styarted");
})