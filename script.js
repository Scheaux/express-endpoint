const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 7070;

const notes = ['note1', 'note2'];

app.get('/notes', (req, res) => {
  res.send(notes);
});

app.listen(port);
