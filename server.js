//server.js

//Base setup

var express = require('express');
var app = express();
var admin = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));


// ROUTES

var router = express.Router();

// route middleware that will happen on every request

router.use(function(req, res, next) {
   //log each request to console.
   console.log(req.method, req.url);

   //continue doing what we were doing and go to the route
   next();
});

router.get('/', function(req,res) {
   console.log(app.mountpath);
    res.send("You're in the Regular home page");
});

router.get('/about', function(req,res) {
   res.send("You're in the About page");
});

// middleware processing the param
router.param('name', function(req,res, next, name) {
   console.log("Validating  " + name);
   // do validation oif name here
   if (name != 'Steve') {
      res.send("You are "+ name + " and not Steve");     
   }

   

   //once validation is done, save the new item in the req
   req.name = name

   // go to next thing
   next();
});

router.get('/user/:name', function(req,res) {

    res.send('Welcome ' + req.name + '!!');
});

//applying multiple actions for /login route intead of separately
app.route('/login')
   .get(function(req,res) {
        res.send('Showing the User login form here');
   })
   .post(function(req,res) {
        res.send('Processing the User login form now!')
   });

admin.get('/', function(req,res) {
   console.log(admin.mountpath); // /admin
   res.send('Admin home page');
});

admin.route('/login')
   .get(function(req,res) {
        res.send('Showing the Admin login form here');
   })
   .post(function(req,res) {
        res.send('Processing the Admin login form now!')
   });


app.use('/', router);

app.use('/admin', admin);  // mount the sub app

// Start the server
app.listen(port);
console.log("Magic happens on port " + port);

