const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
const users = require('./routes/api/users');
const { DATABASE_URL, PORT } = require('./config/keys');

const app = express();

// body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test',
  }),
);

// DB COnfig
// Connect to MongoDB
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

// Use Routes
app.use('/api/posts', posts);
app.use('/api/profile', profile);
app.use('/api/users', users);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
