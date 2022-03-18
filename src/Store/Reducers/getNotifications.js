const intial_value = {
    notificationsList: [],
}

export default function getNotificationsReducer (state = intial_value, action){
    switch (action.type) {
        case 'LIST_NOTIFICATIONS':
            return {
                ...state,
                notificationsList: action.payload,
            }
        default:
            return state
    }
}
