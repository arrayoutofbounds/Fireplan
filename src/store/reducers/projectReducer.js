const initialState = {
    projects: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '1', title: 'help me find peach', content: 'blah blah blah'}
    ]
};

const projectReducer = (state=initialState, action) => {
    switch(action.type){
        case 'CREATE_PROJECT':
            console.log("created project", action.project);
            return state;
        default:
            return state;
    }
}

export default projectReducer;