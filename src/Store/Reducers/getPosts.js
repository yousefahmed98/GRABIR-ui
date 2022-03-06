const intial_value = {
    postsList: [],
}

export default function getPostsReducer (state = intial_value, action){
    switch (action.type) {
        case 'LIST_POSTS':
            return {
                ...state,
                postsList: action.payload,
            }
        default:
            return state
    }
}
// reducer check type of action and compare values 
