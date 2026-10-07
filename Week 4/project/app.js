const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const albumRoutes = require('./routes/albumRoutes');
const artistRoutes = require('./routes/artistRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://anassmagri6_db_user:<passworld@cluster0.hufkwo0.mongodb.net/?appName=Cluster0')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/albums', albumRoutes);
app.use('/artists', artistRoutes);

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/', (req, res) => {
  res.redirect('/albums');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});