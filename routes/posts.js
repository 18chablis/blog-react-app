const router = require("express").Router();

const Post = require("../models/Post");

// CREATE A POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();

    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id); //search for post by ID
    if (post.username === req.body.username) {
      // only post that has same username should be checked
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatedPost);
      } catch (err) {}
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A POST
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id); //'retrieve post first before anything else
  if (post.username === req.body.username) {
    //Post are deleted only if username A is the one that created it
    try {
      await post.delete();
      res.status(200).json("Post has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// GET A POST

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL POST
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
