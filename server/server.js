const express = require('express');
const connectDB = require('./db.js');
const path = require('path');
const Countries = require('./models/Countries.js');
const CountriesEn = require('./models/Countries_en.js');
const CountriesDe = require('./models/Countries_de.js');
const User = require('./models/User.js');
const Ratings = require('./models/Ratings.js');
const { check, validationResult } = require('express-validator');


const app = express();

connectDB();
app.use(express.json({ extended: false, limit: '1mb' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});


// Get ru/en lang countries
app.get('/countries', async (req, res) => {
  if(req.query.lang === 'en') {
    const countries_en = await CountriesEn.find();
    res.send(countries_en);
  } else if (req.query.lang === 'de') {
    const countries_de = await CountriesDe.find();
    res.send(countries_de)
  } else {
    const countries = await Countries.find();
    res.send(countries);
  }
});

app.post('/countries/en', async (req, res) => {
  try {
    await CountriesEn.insertMany(data);
    res.send('Ok')
  } catch(err) {
    res.send(err);
  }
});


// Get Country by ISOCode
app.get('/countries/:ISOCode', async (req, res) => {
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
});

// Get ratings
app.post('/rating', async (req, res) => {
  const ratings = await Ratings.find({attraction: req.body.id})
  res.send(ratings)
});

// Put attraction rating
app.put('/rating', async (req, res) => {
  try {
    const rating = await Ratings.findOneAndUpdate(
      { $and: [{attraction: req.body.attrId}, {userName: req.body.userName}] },
      {
        $set: {      
          rating: req.body.rating,
        }
      },
      { upsert: true }
    )
    await rating.save();
    // res.json(rating);
    const newRating = await Ratings.find({attraction: req.body.attrId})
    res.send(newRating)
  } catch(err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


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

    user = new User({
      name, email, password, photo
    });
    await user.save();
    res.send({email: user.email, photo: user.photo, name: user.name});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
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

    res.send({email: user.email, photo: user.photo, name: user.name});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});





if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on PORT: ' + PORT));
