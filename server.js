


var express = require('express')
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express()

app.use(session({
  resave: false,
  saveUninitialized: false,
secret:'12345'

})
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json

app.use(bodyParser.json())



app.use(function (req, res, next){

if (req.token===undefined) {   req.token = 0 }  else { req.token++ };

req.session.counter = req.session.counter || 0;
  req.session.counter += 1;

console.log('midleware  token:  '+ JSON.stringify(req.session.counter, null, 4));
next();


}
)

app.get ('/app',function (req, res) {
console.log ('get app');

  res.send('app get request '+JSON.stringify(req.session.counter, null, 4))
})


app.get('/', function (req, res) {
console.log ('get route');
res.sendfile('index.html')
//  res.send('root server myserver')
})




app.post('/',(req, res) => {

console.log('post session:  '+ JSON.stringify(req.session.counter, null, 4));
console.log('post Body:  '+ JSON.stringify(req.body, null, 4));
console.log('FName  :  '+ req.body.fname);
}
)

app.listen(3000, async () => {

  console.log('Server ready!')
   // const mongoConnection = await mongoose.connect('mongodb://localhost/nodejs-auth');
//  console.log('Database ready!')

  console.log('Listening on port 3000')
})
