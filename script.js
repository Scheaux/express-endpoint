const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 7070;

let posts = [];
let nextId = 1;

app.get('/posts', (ctx, next) => {
  ctx.response.body = posts;
});

app.post('/posts', (ctx, next) => {
  const { id, content } = ctx.request.body;

  if (id !== 0) {
    posts = posts.map(o => o.id !== id ? o : { ...o, content: content });
    ctx.response.status = 204;
    return;
  }

  posts.push({ ...ctx.request.body, id: nextId++, created: Date.now() });
  ctx.response.status = 204;
});

app.delete('/posts/:id', (ctx, next) => {
  const postId = Number(ctx.params.id);
  const index = posts.findIndex(o => o.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
  }
  ctx.response.status = 204;
});

app.listen(port);
