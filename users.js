var mongoose = require('mongoose');

let userExists = false;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, "users");

module.exports = {


    connect: function () {
        const mongoConnection = mongoose.connect('mongodb://localhost/myserver');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("Connection Successful!");
        });

    },

    addUser: function () {
        

        const user = new User({
            name: 'Sasha',
            password: 'bigball'
        });

        user.save()
            .then(user => {
                console.log(user);
            }).catch(err => {
                console.log(err);
            });

    },

    checkUser: async function (userName) {

        var result = await User.findOne({ name: userName })
        console.log("Search FindOne result is inside :: "+ JSON.stringify(result,null,4));      
      return result;
        //  if (result === null) return  false; else return true;
    },

    exists: function (userName) {
      
     User.exists({ name: userName }, async function (err, result) {
        console.log("Search userExists is inside :: "+  userExists);
       userExists = result;
       console.log("Search result is inside :: "+  result);     
       return  userExists; 
    });
      console.log("Search userExists is  outside ::"+  userExists);
return  userExists;
    }
}