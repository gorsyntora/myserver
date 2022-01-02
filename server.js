var express = require('express')
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
var app = express()

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: '12345'

})
);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {

  if (req.token === undefined) { req.token = 0 } else { req.token++ };
  req.session.counter = req.session.counter || 0;
  req.session.counter += 1;
  console.log('midleware  token:  ' + JSON.stringify(req.session.counter, null, 4));
  next();
}
)

app.get('/app', function (req, res) {
  console.log('get app');
  res.send('app get request ' + JSON.stringify(req.session.counter, null, 4))
})


app.get('/', function (req, res) {
  console.log('get route');
  res.sendfile('index.html')
  //  res.send('root server myserver')
})


app.post('/', (req, res) => {
  console.log('post session:  ' + JSON.stringify(req.session.counter, null, 4));
  console.log('post Body:  ' + JSON.stringify(req.body, null, 4));
  console.log('FName  :  ' + req.body.fname);
}
)

app.listen(3000, async () => {
  console.log('Server ready!')
  await ocrm();

  console.log('Listening on port 3000')
})

function ocrm() {
  const mongoConnection = mongoose.connect('mongodb://localhost/myserver');
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function () {
    console.log("Connection Successful!");
  });

  const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    isbn: { type: String, unique: true },
    created: { type: Date, default: Date.now }
  });
  const Book = mongoose.model('Book', bookSchema);
  const book = new Book({
    name: 'Introduction to Node.js',
    author: 'Atta',
    isbn: 'ABL-4566'
  });

  book.save()
    .then(book => {
      console.log(book);
    }).catch(err => {
      console.log(err);
    });

}