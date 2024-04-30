const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let reviews = [];

// Route to handle POST request for saving content
app.post('/api/reviews', (req, res) => {
  const { isAnonymous, username, content, rating } = req.body;
  const review = {isAnonymous, username, content, rating}; // Use title as the ID
  reviews.push(review);
  console.log('Content saved:', review);
  console.log('Updated reviews:', reviews);
  res.json({ message: 'Content saved successfully' });
});

// Route to handle GET request
app.get('/api/reviews', (req, res) => {
  res.json(reviews);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
