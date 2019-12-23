const express = require('express');
const mongodb = require('mongodb');

const router = new express.Router();

//GET Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

//ADD Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date(),
    });
    res.status(201).send();
});

//DELETE Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
    res.status(200).send();
});

async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb+srv://taskapp:01590@cluster0-xcwq3.mongodb.net/vue_express?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    );
    return client.db('vue_express').collection('posts');
}

module.exports = router;
