import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

export const MealItem = ({
    meal: {meal, calories}, listNum
}) => (
    <div className='row mealitem'>
        <div className='col-sm-1'> 
            {listNum}.
        </div>
        <div className='col-sm-4'>
            {meal}
        </div>
        <div className='col-sm-4'>
            {calories}
        </div>
    </div>
);

MealItem.propTypes = {
    meal: PropTypes.object.isRequired,
    listNum: PropTypes.number.isRequired
};
