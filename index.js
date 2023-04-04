const express = require('express');
const notesRouter = require('./routes/notes');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db/connect')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use('/api/notes', notesRouter);

app.listen(5001, () => {
    console.log('Server started on port 5001');
});