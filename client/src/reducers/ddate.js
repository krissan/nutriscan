import { SET_DATE } from "../actions/types";
import moment from 'moment';

const initialState = {
    ddate: moment().format('YYYY-MM-DD')
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    
    switch(type) {
        case SET_DATE:
            return {
                ...state,
                ddate: payload
            }
        default:
            return state;
    }
}