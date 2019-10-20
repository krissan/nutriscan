import { SET_DATE } from './types';

export const setDate = (ddate) => dispatch => {
    dispatch(
        {
            type: SET_DATE,
            payload: ddate
        }
    );
};