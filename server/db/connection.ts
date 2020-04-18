import firebase from 'firebase';

import { firebaseConfig, REFS } from './config';

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const database = firebaseApp.database();

export const ref = {
  employes: (uid?: string) => database.ref(REFS.EMPLOYES + (uid ? `/${uid}` : '')),
  activities: (uid?: string) => database.ref(REFS.ACTIVITIES + (uid ? `/${uid}` : '')),
};
