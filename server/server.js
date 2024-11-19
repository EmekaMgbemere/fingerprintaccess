const express = require("express");
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Products = require('../server/models/Products');
const Blog = require('../server/models/Blog');
const User = require('../server/models/User');
const Car = require('../server/models/Car');
const Mockapi = require('../server/models/Mockapi');
const Token = require('../server/models/Token');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
var path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const carRoutes = require('../server/routes/carRoutes');
const userRoutes = require('../server/routes/userRoutes');
const productRoutes = require('../server/routes/productRoutes');
const nodemailer = require("nodemailer");
const crypto = require("crypto");

dotenv.config();
app.use(cors());


const URL = "mongodb://127.0.0.1:27017/cars";

const port = process.env.PORT;

app.use(morgan('tiny'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ parameterLimit: 50000, extended: false, limit: '50mb' }));

mongoose.connect(URL,{ 
  useNewUrlParser:true,
  useUnifiedTopology:true 
})
mongoose.connection.on('open',()=>console.log("Mongodb Connected"))
mongoose.connection.on('error',(e)=> console.log(e))

mongoose.set('strictQuery', false);


app.get("/", function (req, res) {
    res.send("Welcome to MyShop Server");
  });

app.post("/signupuser", async(req, res) => {
  try {
    const formData  = req.body;
    console.log(formData)

      if ( !formData) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
      else{
            const salt = await bcrypt.genSalt(10);
            formData.password = await bcrypt.hash(formData.password, salt);
            
            const randomCode = Math.floor(1000 + Math.random() * 9000);  

            formData.secretCode = randomCode;

              const newUser = new User(formData);
              await newUser.save(); 

              return res.status(201).json({ message:'Registration Successful'});
            }

  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

app.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    if (!email || !password) {
      return res.json({ message: 'Username and password are required' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: 'Invalid Credentials: Please try again' });
    }

    // const payload = {
    //   otp: true, 
    // };

    // jwt.sign(
    //   payload,
    //   process.env.jwtSecret,
    //   { expiresIn: '2m' },
    //   async (err) => {
    //     if (err) throw err;

    //     try {
    //       // const newToken = new Token({ user:user, token: token, userId: user.id });
    //       const newToken = new Token({ userId: user.id });
    //       await newToken.save();
    //       console.log(`OTP token saved to the database.`);

    //       res.json({ message: 'OTP has been sent successfully.' });
    //       // res.json({ token, message: 'OTP has been sent successfully.' });

    //       console.log(`OTP token: ${token} for userID: ${user.id}`);
    //     } catch (error) {
    //       return res.json({ message: 'Failed to save token to the database.' });
    //     }
    //   }
    // );

    return res.json({ message: 'Login successful', user, userId: user._id });


  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


  app.post("/logoutuser", async(req, res) => {
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
});

app.delete("/deleteuser", async(req, res) => {

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
  });
  
    app.get("/finduser", async(req, res) => {
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
  })
  
  app.put("/updateuser", async(req, res) => {
   
      let result = await User.updateOne(
        { _id : req.params.id}, 
        { $set: req.body  }
      )
     res.send({ result });
  })

const otpStore = {}; 

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
      user: 'austin91210@gmail.com',
          pass: 'nyzx otmf whhr lzsg',
  }
});

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}

app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
  }

  const otp = generateOtp();
  otpStore[email] = otp;

  const mailOptions = {
    from: 'austin91210@gmail.com', 
    to: email, 
    subject: 'Your OTP Code', 
    text: `Your OTP code is: ${otp}`, 
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).json({ success: false, message: 'Error sending OTP' });
    }
    console.log('OTP sent:', info.response);
    res.status(200).json({ success: true });
  });
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp || otpStore[email] !== otp) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  delete otpStore[email];

  res.status(200).json({ success: true, message: 'OTP verified successfully' });
});

  
app.listen(port, error => {
      if (error) throw error;
      console.log('Your Car Server is running on port 6969');
    });

