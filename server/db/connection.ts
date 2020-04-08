import firebase from 'firebase';

import { firebaseConfig, REFS } from './config';

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const database = firebaseApp.database();

export const ref = {
  employes: database.ref(REFS.EMPLOYES),
  activities: database.ref(REFS.ACTIVITIES),
};
