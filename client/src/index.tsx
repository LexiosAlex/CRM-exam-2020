import React from 'react';
import ReactDOM from 'react-dom';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import App from './components/App';
import { firebaseConfig } from 'common/firebase.config';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import { compose } from 'redux';
import firebase from 'firebase';
import rootEpic from './epics/root';
import 'firebase/auth';

import { GlobalStyle } from './app.styles';

const reduxDevTools = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = reduxDevTools || compose;

const epicMiddleware = createEpicMiddleware();

const rrfConfig = {
  userProfile: 'employees',
};

firebase.initializeApp(firebaseConfig);

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(epicMiddleware)),
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
      <GlobalStyle />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);
