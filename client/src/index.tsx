import React from 'react';
import ReactDOM from 'react-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import App from './components/App';
import { firebaseConfig } from 'common/firebase.config';
// import Firebase from './firebase';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import firebase from 'firebase';
import 'firebase/auth';

import './index.scss';

const rrfConfig = {
  userProfile: 'employes',
};

firebase.initializeApp(firebaseConfig);

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
