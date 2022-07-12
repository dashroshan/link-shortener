// require('./env');
const isProd = true;

let mongoDBLink = 'mongodb://localhost/';

if (isProd) {
    mongoDBLink = process.env.MONGO;
}

module.exports.mongoDBLink = mongoDBLink;