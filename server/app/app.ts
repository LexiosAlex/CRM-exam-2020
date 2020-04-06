import express from 'express';

const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3050, () => {
  console.log('Example app listening on port 3050!');
});
