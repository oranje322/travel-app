const express = require('express');
const connectDB = require('./db.js');
const path = require('path');
const Countries = require('./models/Countries.js');

const app = express();

connectDB();

//init middleware / bodyParser
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  next();
});

app.get('/', async (req, res) => {
  const countries = await Countries.find();
  res.send(countries);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started on PORT: ' + PORT));
