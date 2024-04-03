import ACTION_TYPES from "../store/actionTypes";

const INIT_STATE = {
    calcHistory: [],
    user: null,
    calcDisplayValue: "0"
};

function calcReducer(state = INIT_STATE, action) {
    switch (action.type) {
        case ACTION_TYPES.SET_CALC_DISPLAY_VALUE: {
            return {
                ...state,
                calcDisplayValue: action.payload
            };
        }
        case ACTION_TYPES.SAVE_HISTORY: {
            const newHistory = [...state.calcHistory, action.payload]
            if (newHistory.length > 20) newHistory.shift()
            return {
                ...state,
                calcHistory: newHistory
            };
        }
        case ACTION_TYPES.CLEAR_HISTORY: {
            return {
                ...state,
                calcHistory: []
            };
        }
        case ACTION_TYPES.LOGIN: {
            return {
                ...state,
                user: action.payload
            };
        }
        case ACTION_TYPES.LOGOUT: {
            return {
                calcHistory: [],
                user: null,
                calcDisplayValue: "0"
            };
        }
        default:
            return state
    }
}

export default calcReducer;
