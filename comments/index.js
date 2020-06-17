const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req,res) => {
    //Guard against empty comment array in case there are no comments.
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req,res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    //If there are no comments, this will return undefined.
    //In that case, return empty array [].
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content }); 
    commentsByPostId[req.params.id] = comments;
    
    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on 4001');
})