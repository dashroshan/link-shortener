const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.mongoDBLink + 'shortlink')
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