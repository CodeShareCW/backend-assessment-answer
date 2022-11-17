require('module-alias/register');
const express = require('express');
const app = express();
const postRouter = require('@api/post');

const port = process.env.PORT || 5000;
const vers = process.env.API_VERSION || 'v1';

app.get('/', (req, res) => {
  res.json({ message: 'Root page' });
});

app.use(`/api/${vers}/post`, postRouter);

/* Error handler middleware */
app.use((req, res, next) => {
  const statusCode = 404;
  return res
    .status(statusCode)
    .json({ status_code: statusCode, message: 'Not found' });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res
    .status(statusCode)
    .json({ status_code: statusCode, message: err.message });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
