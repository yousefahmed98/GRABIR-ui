const intial_value = {
    allTags: [],
}

export default function getTagsReducer (state = intial_value, action){
    switch (action.type) {
        case 'LIST_Tags':
            return {
                ...state,
                allTags: action.payload,
            }
        default:
            return state
    }
}
// reducer check type of action and compare values 
