const initialState = {
    projects: [
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '1', title: 'help me find peach', content: 'blah blah blah'},
        {id: '1', title: 'help me find peach', content: 'blah blah blah'}
    ]
};

const projectReducer = (state=initialState, action) => {
    return state;
}

export default projectReducer;