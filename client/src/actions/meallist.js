import axios from 'axios';
import { setAlert } from './alert';
import { setDate } from './ddate';

import {
    GET_MEALLIST,
    MEALLIST_ERROR
} from './types';

function isJSON (something) {
    if (typeof something != 'string')
        something = JSON.stringify(something);

    try {
        JSON.parse(something);
        return true;
    } catch (e) {
        return false;
    }
}

export const getCurrentMeallist = (ddate) => async dispatch => {
    try {
        const res = await axios.get('/api/meallist/me', {params: {ddate: ddate}}, function(req, res) {
            });

        if (res.data.msg === 'There is no meal list for date or user')
        {
            dispatch({
                type: GET_MEALLIST,
                payload: null
            });
        }

        const mealListObj = {};

        mealListObj.MealList = [];


        for(let i = 0;i < res.data.MealList.length;i++)
        {
            let mealObj = {}
            let id = '';
            if(isJSON(res.data.MealList[i])){
                id = JSON.parse(res.data.MealList[i]);
            }
            else
            {
                id = res.data.MealList[i];
            }

            let meal = await axios.get(`/api/meal/id/?id=${id}`);
            mealObj.meal = meal.data.meal;
            mealObj.calories = meal.data.calories;
            mealListObj.MealList.push(mealObj);
        }

        mealListObj.user = {};
        mealListObj.user.id = '';
        mealListObj.user.name = '';

        if(isJSON(res.data.MealList._id)){
            
            mealListObj.id = JSON.parse(res.data._id);
        }
        else
        {
            mealListObj.id = res.data._id;
        }

        if(isJSON(res.data.user._id)){
            mealListObj.user.id = JSON.parse(res.data.user._id);
        }
        else
        {
            mealListObj.user.id = res.data.user._id;
        }

        
        mealListObj.user.name = res.data.user.name;

        dispatch({
            type: GET_MEALLIST,
            payload: mealListObj
        });
    }   catch(err)
    {
        dispatch({
            type: MEALLIST_ERROR,
            payload: { msg: err }
        });
    }
}


export const deleteMeallist = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/meallist/${id}`);

        if (res.data.msg === 'There is no meal list for date or user')
        {
            dispatch({
                type: GET_MEALLIST,
                payload: null
            });
        }

        dispatch({
            type: GET_MEALLIST,
            payload: null
        });
    }   catch(err)
    {
        dispatch({
            type: MEALLIST_ERROR,
            payload: { msg: err }
        });
    }
}

export const createMeallist = (formData, history, edit = false) => async dispatch => {
    try{
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        /*const getRes = await axios.get('/api/meallist/me', {params: {ddate: formData.ddate}}, function(req, res) {
        });*/


        const res = await axios.post('/api/meallist', formData, config);


        /*if (getRes.data.msg === 'There is no meal list for date or user')
        {

        }*/

        console.log(res);
        
        //get posted meallist for date
        getCurrentMeallist(formData.ddate);

        dispatch(setAlert(edit ? 'Meal Updated' : 'Meal Created'));

        setDate(formData.ddate);

        if(!edit) {
            history.push('/diary');
        }

    } catch(err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        dispatch({
            type: MEALLIST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}