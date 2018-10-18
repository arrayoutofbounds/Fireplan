// username and password
export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        // make async call to fire store

        // intialise firebase
        const firebase = getFirebase();

        // sign in with an email and password using the firebase auth module. This is async.
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