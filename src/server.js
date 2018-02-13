const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

let nextId = 0;

server.get('/posts', (req, res) => {
  const query = req.query.term;

  res.send(
    posts.filter(
      post => post.title.includes(query) || post.contents.includes(query),
    ),
  );
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;

  if (title === undefined || contents === undefined)
    res
      .status(STATUS_USER_ERROR)
      .send({ error: 'Title or contents undefined.' });

  const post = { id: nextId++, title, contents };

  posts.push(post);
  res.send(post);
});

module.exports = { posts, server };
