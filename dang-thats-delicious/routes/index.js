const express = require('express');
const router = express.Router();

// Do work here
router.get('/', (req, res) => {
  // res.send('Hey! It works!');
  res.render('hello', {
    title: 'Getting Started w. Node'
  });
});

module.exports = router;
