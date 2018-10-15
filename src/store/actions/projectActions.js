export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to fire store

        // gives us a reference to the firestore database
        const firestore = getFirestore(); 

        // async, that returns a promise
        firestore.collection('projects').add({ 
            ...project,
            authorFirstName: 'anmol',
            authorLastName: 'desai',
            authorId: 12345,
            createdAt: new Date()
        }).then(() => {
            dispatch({type: 'CREATE_PROJECT', project});
        }).catch((err) => {
            dispatch({ type: 'CREATE_PROJECT_ERROR', err })
        });
    }
};