const { validationResult } = require('express-validator/check');
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{
      _id: '8',
      title: 'First Post',
      content: 'This is the first post!',
      imageUrl: 'images/teapot.jpeg',
      creator: {
        name: 'Norm'
      },
      createdAt: new Date()
    }]
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ 
        message: 'Validation failed', 
        error: errors.array() 
      })
  }

  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'images/teapot.jpeg',
    creator: { name: 'Jack' }
  });
  post.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Post created successfully!',
      post: result
    });
  }).catch(err => console.log(err));
};