const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/blogDB', {
    serverSelectionTimeoutMS: 50000 // Increase timeout if needed
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use('/', blogRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
