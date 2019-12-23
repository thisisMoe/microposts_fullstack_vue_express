const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

//Handle Prduction
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
