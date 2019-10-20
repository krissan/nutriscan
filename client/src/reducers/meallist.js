import { GET_MEALLIST, UPDATE_MEALLIST, GET_MEALLISTS, MEALLIST_ERROR, CLEAR_MEALLIST } from "../actions/types";

const initialState = {
    id: '',
    meallist: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case GET_MEALLIST:
        case UPDATE_MEALLIST:
            return {
                ...state,
                meallist: payload,
                loading:false
            }
        case GET_MEALLISTS:
            return {
                ...state,
                meallist: payload,
                loading: false
            }
        case MEALLIST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_MEALLIST:
            return {
                ...state,
                meallist: null,
                loading: false
            }
        default:
            return state;
    }
}