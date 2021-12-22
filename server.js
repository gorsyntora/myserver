


var express = require('express')
var bodyParser = require('body-parser');

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {

res.sendfile('index.html')
//  res.send('root server myserver')
})


app.post('/',(req, res) => {
console.log('post resource:  '+ JSON.stringify(req.body, null, 4));
console.log('resource:  '+ req.body.fname);
}
)

app.listen(3000, async () => {
  console.log('Server ready!')
   // const mongoConnection = await mongoose.connect('mongodb://localhost/nodejs-auth');
//  console.log('Database ready!')

  console.log('Listening on port 3000')
})
