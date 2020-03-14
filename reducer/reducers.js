const initialState = {
    config: {
        isNonMeetingLectureOpened: false
    },
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_CONFIG_STARTED': {
            return {...state, config: action.payload}
        }
        default: {
            return;
        }
    }
}