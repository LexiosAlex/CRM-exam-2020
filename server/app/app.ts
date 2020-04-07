import './env/env';
import express from 'express';
import path from 'path';

const app: express.Application = express();

app.use('/', express.static(path.join(__dirname, `${process.env.CLIENT_BUILD_PATH}`)));

app.listen(`${process.env.PORT}`, () => {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});
