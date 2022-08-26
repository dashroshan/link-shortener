const express = require('express');
const Link = require('./mongodb');
const cors = require('cors');

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());

async function createLink(req, res) {
    const exists = await Link.countDocuments({ shortLink: req.body.shortLink });
    if (exists) {
        res.status(400).send('Short link taken!');
        return;
    }

    let charset = "abcdefghijklmnopqrstuvwxyz";
    let deleteCode = "";
    for (let i = 0; i < 10; i++)
        deleteCode += charset[Math.floor(Math.random() * charset.length)];

    const link = new Link({
        longLink: req.body.longLink,
        shortLink: req.body.shortLink,
        deleteCode: deleteCode,
        visits: 0,
    });
    await link.save();
    res.status(200).send({ deleteCode: deleteCode, shortLink: req.body.shortLink });
}

async function getLink(req, res) {
    const link = await Link
        .findOneAndUpdate({ shortLink: req.body.shortLink }, { $inc: { visits: 1 }, $currentDate: { lastUsed: true } }, { new: true })
        .select({ longLink: 1 });
    if (link != null) res.status(200).send(link);
    else res.status(404).send('Short link not found!');
}

async function deleteLink(req, res) {
    const deleted = await Link.deleteOne({ deleteCode: req.body.deleteCode, shortLink: req.body.shortLink });
    if (deleted.deletedCount != 0) res.status(200).send('Deleted!');
    else res.status(404).send('Invalid shortlink and deletecode combination');
}

async function getVisits(req, res) {
    const visits = await Link
        .findOne({ shortLink: req.body.shortLink })
        .select({ visits: 1 });
    if (visits != null) res.status(200).send(visits);
    else res.status(404).send('Short link not found!');
}

app.post('/create', (req, res) => {
    createLink(req, res);
});

app.post('/delete', (req, res) => {
    deleteLink(req, res);
});

app.post('/get', (req, res) => {
    getLink(req, res);
});

app.post('/visits', (req, res) => {
    getVisits(req, res);
});

app.listen(port, () => console.log(`Running on port ${port}...`));