import '../app/env/env';

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.FIREBASE_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
};

export const REFS = {
  EMPLOYES: 'employes',
  ACTIVITIES: 'activities',
};

export const DB_RESET_CONFIG = {
  OPERATORS: 2,
  VOLUNTEERS: 5,
  ACTIVITIES: 10,
};
