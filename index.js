var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var app = express();
app.use(cors());
app.use(express.json());
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


const reviewSchema = new mongoose.Schema({
  isAnonymous: Boolean,
  username: String,
  content: String,
  rating: Number
});

const review = mongoose.model('Review', reviewSchema);

// route to add a new review
app.post('/api/reviews', (req, res) => {
  const Review = new review(req.body);
  Review.save()
    .then(newReview => res.status(201).json(newReview))
    .catch(err => res.status(500).json({ message: 'Failed to save review', error: err }));
});

// route to fetch all reviews
app.get('/api/reviews', (req, res) => {
  review.find()
    .then(reviews => res.json(reviews))
    .catch(err => res.status(500).json({ message: 'Failed to fetch reviews', error: err }));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
