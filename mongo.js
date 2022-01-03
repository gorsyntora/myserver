var mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: String,
    isbn: { type: String, unique: true },
    created: { type: Date, default: Date.now }

});

module.exports = {
   
    add: function() {

        console.log('function add was sucessefully called');
    },

    ocrm: function () {

        const mongoConnection = mongoose.connect('mongodb://localhost/myserver');
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("Connection Successful!");
        });

      
        const Book = mongoose.model('Book', bookSchema, "books");
        const book = new Book({
            name: 'Introduction to express.js',
            author: 'Atta',
            isbn: 'ABL-4522'
        });

        book.save()
            .then(book => {
                console.log(book);
            }).catch(err => {
                console.log(err);
            });

        Book.exists({ isbn: "ABL-4521" }, function (err, result) {

            console.log("Search result is :: "+ result);
        });

    }
}