import express from 'express';
import './env/env';

import * as firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.FIREBASE_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
};

firebase.initializeApp(firebaseConfig);

const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3050, () => {
  console.log('Example app listening on port 3050!');
});
