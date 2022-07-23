const { connect } = require('mongoose');
const express = require('express');
const path = require('path');
const contact = require('./models/ContactModel.js');

const MongoURL = 'mongodb+srv://create:createx@cluster0.qspfszx.mongodb.net/createx?authSource=admin&replicaSet=atlas-vw06do-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const connection = connect(MongoURL, {
    autoIndex: false,
    family: 4,
    connectTimeoutMS: 10000
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.get('/submitted', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/submitted', (req, res) => {
    connection.then(async () => {
        delete req.body._id;
        await contact.findOneAndUpdate(
            { name: req.body.firstname },
            {
                name: req.body.firstname,
                surname: req.body.lastname || '',
                country: req.body.country,
                subject: req.body.subject || ''
            },
            {
                upsert: true,
                new: true
            }
        );
    });

    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
});