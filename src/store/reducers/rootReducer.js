import authReducer from './authReducer';
import projectReducer from './projectReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore'; // premade for syncing our firestore data to redux state/
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    firestore: firestoreReducer, // going to sync firestore data into redux. Data is dependent on component that is active. need to tell it which data to sync. which collection to get.
    firebase: firebaseReducer, // automatically goes and gets the current user for us
});

export default rootReducer;