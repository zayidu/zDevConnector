const express = require('express');
const router = express.Router();
// const request = require('request');
const config = require('config');

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');

// @route   Get api/posts
// @desc    Register Posts
// @access  Public
// router.get('/', (req, res) => res.send('Posts Route...'));

// @route   Post api/posts
// @desc    Create a Post
// @access  Public
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      // Create a  Post Object
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      // console.log(post);
      res.json(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   Get api/posts
// @desc    Get Posts
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   Get api/posts/:id
// @desc    Get Post by ID
// @access  Public
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    res.json(post);
  } catch (error) {
    console.log(error.message);
    if (!error.kind === 'ObjectId')
      res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    DELETE A Post
// @access  Public
router.delete('/:id', auth, async (req, res) => {
  try {
    // if (await Post.findById(req.params.id)) {
    //   await Post.findByIdAndDelete(req.params.id);
    //   res.json({ msg: 'Post Deleted' });
    // } else {
    //   res.json({ msg: 'Post Not Found' });
    // }
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User Not Authorised' });
    }
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.log(error.message);
    if (!error.kind === 'ObjectId')
      res.status(404).json({ msg: 'Post not found' });
    res.status(500).send('Server Error');
  }
});

// @route   put api/posts/like/:id
// @desc    Like a Post by ID
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: `Post already liked by the user` });
    }

    // If not liked:
    post.likes.unshift({ user: req.user.id });
    post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   put api/posts/unlike/:id
// @desc    Like a Post by ID
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Check if the post has already liked by the user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: `Post has not been liked` });
    }

    // If liked:
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   Post api/posts/comment/:id
// @desc    Comment a Post
// @access  Public
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is  required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      // Create a  Comment Object
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
      // console.log(post);
      res.json(post.comments);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Post api/posts/comment/:post_id/:comment_id
// @desc    Delete a Comment
// @access  Public
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //Pull on comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make sure comment exists
    if (!comment)
      return res.status(404).json({ msg: 'Comment does not exist' });

    // Check the user who actually posted the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
