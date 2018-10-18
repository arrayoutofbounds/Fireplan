// username and password
export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        // make async call to fire store

        // intialise firebase
        const firebase = getFirebase();

        // sign in with an email and password using the firebase auth module. This is async. This is shown in the auth part of the firebase.
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        }); 
    }
};

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'SIGNOUT_SUCCESS' });
        }).catch((err) => {
            console.log("signout failed")
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        // its ok if the collection is not created at first. this creates it automatically.
        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({ // doc allows us to setup the id of the document to be the same as the auth id
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0] 
            }) // this is async and returns a promise
        }).then(() => {
            dispatch({
                type: 'SIGNUP_SUCCESS'
            });
        }).catch((err) => {
            dispatch({
                type: "SIGNUP_ERROR",
                err
            })
        });
    }
}