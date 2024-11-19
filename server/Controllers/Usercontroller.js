const User = require('../models/User');
const bcrypt = require('bcrypt'); 

const Signupuser = async (req, res) => {
  try {
    const { formData } = req.body;

      if (!formData || !formData.fullName || !formData.email || !formData.password || !formData.privacyPolicy) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const salt = await bcrypt.genSalt(10);
    formData.password = await bcrypt.hash(formData.password, salt);
    
    const newUser = new User(formData);
    await newUser.save(); 

    res.status(201).send('Registration Successful');
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const Users = async (req, res) => {
  User.find()
  .then(user => res.json(user))
};

const Loginuser = async(req, res) => {

  const { email, password, secretKey } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid Credentials A' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid Credentials: Password is incorrect' });
    }

else{ 
const payload = {
user: {
  id: user.id,
},
};

jwt.sign(
payload,
process.env.jwtSecret,
{ expiresIn: '1d' },
async (err, token) => {
  if (err) throw err;

  try {
    const newToken = new Token({
      token: token
    });
    await newToken.save();
    console.log(`Token saved to the database.`);
    
    res.json({ token, user });
    const UserId = user._id;
    store.set('user', UserId )

    console.log(`Login token: ${token} and userID: ${UserId}`);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save token to the database.' });
  }
}
);
}

  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const Logoutuser = async (req, res) => {
  const {Utoken} = req.body;
  Token.findOneAndDelete({ Utoken }, (err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred during logout' });
    } else if (!doc) {
      res.status(404).json({ message: 'Token not found or already expired' });
    } else {
      res.json({ message: 'Logout successful' });
    }
  });
};

const Deleteuser = async (req, res) => {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
      
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const Finduser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
const Updateuser =  async (req, res) => {
   
      let result = await User.updateOne(
        { _id : req.params.id}, 
        { $set: req.body  }
      )
     res.send({ result });
  };

  module.exports = { Updateuser,Finduser,Deleteuser, Logoutuser, Loginuser, Users, Signupuser }