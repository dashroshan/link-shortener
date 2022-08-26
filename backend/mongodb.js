const mongoose = require('mongoose');

const mongoDBLink = process.env.MONGO || 'mongodb://localhost';

mongoose.connect(mongoDBLink + '/shortlink')
    .then(() => console.log('Connected to mongodb...'))
    .catch((err) => console.error('Couldnot connect to mongodb...', err));

const linkSchema = new mongoose.Schema({
    longLink: String,
    shortLink: String,
    deleteCode: String,
    visits: Number,
    lastUsed: { type: Date, default: Date.now }
});

const Link = mongoose.model('links', linkSchema);

module.exports = Link;