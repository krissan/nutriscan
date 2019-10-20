import { SET_EDIT_TOGGLE } from "../actions/types";

const initialState = {
    editToggle: false
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case SET_EDIT_TOGGLE:
            return {
                ...state,
                editToggle: payload
            }
        default:
            return state;
    }
}