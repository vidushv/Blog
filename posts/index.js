const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();

const posts = {};

//Get request
app.get('/posts', (req, res) => {
    res.send(posts);
});

//Post request
app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };

    req.statusCode(201).send(posts[id]);

});

app.listen(4000, () => {
    console.log('Listening on 4000');
});