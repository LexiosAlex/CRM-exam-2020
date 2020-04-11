import React from 'react';
import ReactDOM from 'react-dom';

import { firebaseConfig } from 'common/firebase.config';
import Firebase from './firebase';

import App from './components/App';

const FB = new Firebase(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));
