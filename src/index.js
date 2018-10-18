import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux'; // this binds the react with redux
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';  // firestore bindings for redux
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'; // firebase bindings for redux
import fbConfig from './config/fbConfig';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  // other store enhancers if any
  reduxFirestore(fbConfig),
  reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true}),
);
 // uses firestore to sync to profile in auth object, set collection and sync that doc inside collection with profile object in state, attach when auth is ready. Firebase does not know the collection name.

// creates a store
const store = createStore(rootReducer,  enhancer);

// only show the app when the auth is ready. useful for refreshing to ensure nothing weird shows up in between
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  registerServiceWorker();
});
