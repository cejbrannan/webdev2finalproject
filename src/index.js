var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');

var app = express();
app.use(cors());

const uri = "mongodb+srv://4830:Password@cluster0.uu5wuim.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected successfully to MongoDB using Mongoose!");
});


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  review: String,
  recommend: String

});

const User = mongoose.model('User', userSchema);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

