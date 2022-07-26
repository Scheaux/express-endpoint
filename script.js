const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 7070;

let posts = [];
let nextId = 1;

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', (req, res) => {
  const { id } = req.body;

  if (id === '0') {
    posts.push({ ...req.body, id: nextId, created: Date.now() });
    res.sendStatus(204);
    nextId++;
    return;
  }

  posts = [...posts, req.body];
  res.sendStatus(204);
});

app.delete('/posts/:id', (req, res) => {
  const postId = Number(req.params.id);
  posts = posts.filter((x) => x.id !== postId);
  res.sendStatus(204);
});

app.listen(port);
