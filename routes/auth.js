const router = require("express").Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");

// REGISTER
//it's the method that act when the user click on the register button or url
//always use an asynchronous function
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);//it is used for password encryption

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    
    //creating new user 
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();// save the new user in the db

    res.status(200).json(user);// the responses
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN

router.post("/login", async (req, res) => {
  try {
    //.findOne() search for a specify user with the parameter giving by the user
    const user = await User.findOne({ username: req.body.username });
    // when the user didn't find a corresponding username it has to return an error
    !user && res.status(400).json("Wrong credentials!");

    //in the bcrypt module,there exist a function called .compare() 
    //it helps making comparison within entered password parameter and DB value
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credential");

    const { password, ...others } = user._doc; 

    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
