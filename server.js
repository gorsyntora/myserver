var express = require('express')
var bodyParser = require('body-parser');
var session = require('express-session');
const myMongo = require('./mongo.js');
const users = require('./users.js');
const { ConnectionCheckedInEvent } = require('mongodb');

//const MongoClient = require('mongodb').MongoClient;
var app = express()

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: '12345'
})
);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {

console.log('midleware  token:  ' + JSON.stringify(req.session.userId, null, 4)); 
//if (req.session.userId === undefined&req.originalUrl != '/login') res.redirect('/login');

// req.session.counter = req.session.counter || 0;
 // req.session.counter += 1;
 //console.log('midleware  token:  ' + JSON.stringify(req.originalUrl, null, 4));
 //console.log('midleware  token:  ' + JSON.stringify(req.session.userId, null, 4));
  next();
}
)
app.use(express.static(__dirname + '/'));

// Routes for web server

app.get('/app', function (req, res) {
  console.log('get app');
  res.send('app get request ' + JSON.stringify(req.session.counter, null, 4))
})


app.get('/', function (req, res) {
  console.log('get route');
  res.sendfile('./dist/petstore/index.html')
  //  res.send('root server myserver')
})


app.post('/', (req, res) => {
  console.log('post session:  ' + JSON.stringify(req.session.counter, null, 4));
  console.log('post Body:  ' + JSON.stringify(req.body, null, 4));
  console.log('FName  :  ' + req.body.fname);
}
)

app.post('/add', (req, res) => {
  console.log('post session adress add:  ' + JSON.stringify(req.body, null, 4));
}
)


app.listen(3000, async () => {
  console.log('Server ready!')
  myMongo.add();
  myMongo.ocrm();
  users.connect();
 // users.addUser();

  console.log('Listening on port 3000')

})

app.get('/login', function (req, res) {
  console.log("\x1b[31m%s\x1b[0m",'get login');
  //res.send('login get request ' + JSON.stringify(req.session.userId, null, 4))
  res.sendfile('login3.html')
})

app.post('/login', async (req, res) => {
 // console.log('post session adress add:  ' + JSON.stringify(req.body, null, 4));
  var checked = await users.checkUser(req.body.email);
 if (checked !== null)  {
   if (checked.password === req.body.password) {
 req.session.userId = 202201;    
 res.redirect('/');

 // res.send(' Logging in succesed:: '+ JSON.stringify(checked.password, null, 4));  


} else
  res.send(' Wrong password, please try again later:: '+ JSON.stringify(checked.password, null, 4)); 
 }
 // var logstr = checked.then((result)=>{
 //  console.log(' User  logged exists:: '+ JSON.stringify(result, null, 4))})
 console.log('post session adress add:  ' + JSON.stringify(checked, null, 4));
 //res.send(' User  logged exists:: '+ JSON.stringify(checked, null, 4));
 })
