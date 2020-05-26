const express = require('express');
const router = express.Router();

// @route   Get api/profile
// @desc    Register Profile
// @access  Public
router.get('/', (req, res) => res.send('Profile Route...'));

module.exports = router;
