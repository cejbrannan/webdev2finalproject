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

// route to delete a review
app.delete('/api/reviews/:id', (req, res) => {
  const postId = req.params.id;

  review.findOneAndDelete({_id: postId})
    .then(deletedPost => {
      if (!deletedPost)
      {
        return res.status(404).json({ message: 'Review not found '});
      }
      res.status(204).end();
    })
    .catch(err => {
      console.error('Error deleting post:', err);
      res.status(500).json({ message: 'Failed to delete post', error: err});
    });
});


// route to update/edit a review
app.put('/api/reviews/:id', (req, res) => {
  const reviewId = req.params.id;
  const updatedReviewPost = req.content;
  const updatedReviewRating = req.rating;

  review.findByIdAndUpdate(reviewId, updatedReviewPost, updatedReviewRating, {new: true})
    .then(updatedReview => {
      if (!updatedReview) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.json(updatedReview);
    })
    .catch(err => {
      console.error('Error updating review:', err);
      res.status(500).json({ message: 'Failed to update review', err});
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
