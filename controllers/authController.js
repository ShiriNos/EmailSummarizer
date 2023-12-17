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
    res.send('new signup');
    console.log(req.body);
  }
  
  module.exports.login_post = async (req, res) => {
    res.send('user login');
    console.log(req.body);
  }