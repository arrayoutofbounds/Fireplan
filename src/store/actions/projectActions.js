export const createProject = (project) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to fire store

        dispatch({type: 'CREATE_PROJECT', project});
    }
};