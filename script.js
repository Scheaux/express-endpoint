const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4 } = require('uuid');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 7070;

let notes = [
  { content: 'note1', id: v4() },
  { content: 'note2', id: v4() }
];

app.get('/notes', (req, res) => {
  res.send(notes);
});

app.post('/notes', (req, res) => {
  notes.push(req.body);
  res.send(notes);
});

app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(x => x.id !== req.params.id);
  res.send(notes);
});

app.listen(port);
