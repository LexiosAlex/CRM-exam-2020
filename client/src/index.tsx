import React from 'react';
import ReactDOM from 'react-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import App from './components/App';
import { firebaseConfig } from 'common/firebase.config';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import firebase from 'firebase';
import 'firebase/auth';
const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

import './index.scss';

const rrfConfig = {
  userProfile: 'employes',
};

firebase.initializeApp(firebaseConfig);

const initialState = {};
const store = createStore(rootReducer, initialState, reduxDevTools && reduxDevTools());

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
