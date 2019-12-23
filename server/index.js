const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(express.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
