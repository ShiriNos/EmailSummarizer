const User = require("../models/User");

// controller actions
module.exports.signup_get = (req, res) => {
    res.status(200).send({
        first: 'testSignup'
      });
}

module.exports.login_get = (req, res) => {
    res.status(200).send({
        second: 'testLogin',
      });
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  }
  catch(err) {
    console.log(err);
    res.status(400).send('error, user not created');
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);
  res.send('user login');
}