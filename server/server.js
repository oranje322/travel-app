const express = require('express');
const connectDB = require('./db.js');
const path = require('path');
const Countries = require('./models/Countries.js');
const User = require('./models/User.js');
const { check, validationResult } = require('express-validator');


const app = express();

connectDB();
app.use(express.json({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

// Get Countries
app.get('/', async (req, res) => {
  const countries = await Countries.find();
  res.send(countries);
});

// Get Country by name
app.get('/:ISOCode', async (req, res) => {
  try {
    const country = await Countries.findOne({ISOCode: req.params.ISOCode.toUpperCase()});

    if (!country) {
      return res.status(400).json('No country found in database');
    }

    res.json(country);
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

// User registration
app.post('/join',[
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength(6),
] , async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, photo } = req.body;

  try {
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }]});
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

  user = new User({
    name, email, password, photo
  })

  await user.save();
});

// User login
app.post('/login', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Crederntials' }]});
    }

    const isMatch = password === user.password;

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Crederntials' }]});
    }

    res.send(user.id);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});





if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on PORT: ' + PORT));
