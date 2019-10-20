import { SET_EDIT_TOGGLE } from './types';

export const setEditToggle = (toggle) => dispatch => {
    dispatch(
        {
            type: SET_EDIT_TOGGLE,
            payload: toggle
        }
    );
};