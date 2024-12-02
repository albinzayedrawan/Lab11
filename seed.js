const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/bookModel');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const seedBooks = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    publishedYear: 1960,
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    publishedYear: 1949,
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    publishedYear: 1851,
  },
];

const seedDB = async () => {
  try {
    await Book.deleteMany({});
    await Book.insertMany(seedBooks);
    console.log('Database seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();