const express = require('express');
const router = express.Router();

// @route   Get api/posts
// @desc    Register Posts
// @access  Public
router.get('/', (req, res) => res.send('Posts Route...'));

module.exports = router;
