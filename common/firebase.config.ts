export const firebaseConfig =
  process.env.DEV === 'true'
    ? {
        apiKey: process.env.FIREBASE_API_KEY,
        databaseURL: `http://localhost:${process.env.FIREBASE_DATABASE_URL_DEV_PORT}?ns=${process.env.FIREBASE_PROJECT_ID}`,
      }
    : {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
        projectId: `${process.env.FIREBASE_PROJECT_ID}`,
        storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
        messagingSenderId: `${process.env.FIREBASE_SENDER_ID}`,
        appId: `${process.env.FIREBASE_APP_ID}`,
      };
