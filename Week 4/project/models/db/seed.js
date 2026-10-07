const mongoose = require('mongoose');
const artist = require('../Artist');
const album = require('../Album');

mongoose.connect('mongodb://localhost:27017/music_library')
  .then(() => console.log('Connected to MongoDB for seeding...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

async function seedDatabase() {
  try {
    await artist.deleteMany({});
    await album.deleteMany({});

    const sampleArtists = [
      { name: 'The Beatles', genre: 'Rock', bio: 'An English rock band formed in Liverpool in 1960.' },
      { name: 'Taylor Swift', genre: 'Pop', bio: 'An American singer-songwriter known for narrative songs about her personal life.' },
      { name: 'Miles Davis', genre: 'Jazz', bio: 'An American jazz trumpeter, bandleader, and composer.' }
    ];

     const insertedArtists = await artist.insertMany(sampleArtists);

    const sampleAlbums = [
      { title: 'Abbey Road', artist: insertedArtists[0]._id, releaseDate: new Date('1969-09-26'), genre: 'Rock' },
      { title: '1989', artist: insertedArtists[1]._id, releaseDate: new Date('2014-10-27'), genre: 'Pop' },
      { title: 'Kind of Blue', artist: insertedArtists[2]._id, releaseDate: new Date('1959-08-17'), genre: 'Jazz' }
    ];
    await album.insertMany(sampleAlbums);

    console.log('Seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding the database:', err);
  } finally {
    mongoose.disconnect();
  }
}

seedDatabase();