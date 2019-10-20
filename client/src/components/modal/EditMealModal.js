import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { createMeallist } from '../../actions/meallist';
import ReactDOM from 'react-dom';
//import { setEditToggle } from '../../actions/editToggle';
import './modal.css';

const EditMealModal = ({ createMeallist, meallist: { meallist, loading }, ddate: { ddate }, modalToggle, setModalToggle, history }) => {
    const [formState, setFormState] = useState({formDate: ddate.ddate || ""})
    
    const onFormChange = (e) => setFormState ({
        ...formState,
        [e.target.name]: [e.target.value]
    });

    const blankMeal = {meal: '', calories: ''};
    const [mealState, setMealState] = useState(
        [...meallist.MealList,]
    );

    const onMealChange = (e) => {
        const updatedMeals = [...mealState];
        updatedMeals[e.target.dataset.idx][e.target.className] = e.target.value;
        setMealState(updatedMeals);
    }

    const addMeal = (e) => {
        e.preventDefault();
        setMealState(
            [...mealState, {...blankMeal}]
        );
    } 

    const del = (e,idx) => {
        e.preventDefault();
        const updatedMeals = [...mealState];
        updatedMeals.splice(e.data-idx,1);
        setMealState(updatedMeals);
    }

    const goBack = (e) => {
        setModalToggle();
        //setEditToggle(false);
    }

    const onSubmit = e => {
        e.preventDefault();
        createMeallist({ddate: ddate, meallist: mealState}, history, true);
    };    


    return modalToggle ? (
        <Fragment>
            <div className="editModal">
                <div className="row"><h1>Meal Plan for {ddate}</h1></div>
                <small>* = required field</small>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="row">
                        <button className="btn" type="button" onClick={e => addMeal(e)}>Add Meal</button>
                    </div>
                    {
                        mealState.map((val, idx)=> {
                            let mealId = `meal-${idx}`, caloriesId = `calories-${idx}`
                            return (
                            <div key={idx}>
                                <div className='row form-row'>
                                    <div className='col-sm-3'>
                                        <label className="inputLabel form-row-element" htmlFor={mealId}>{`Meal #${idx + 1}`}</label>
                                        <input
                                            type="text"
                                            name={mealId}
                                            data-idx={idx}
                                            id={mealId}
                                            className="meal form-row-element"
                                            value={mealState[idx].meal}
                                            onChange={e => onMealChange(e)}
                                        />
                                    </div>
                                    <div className='col-sm-3'>
                                        <label className="inputLabel form-row-element" htmlFor={caloriesId}>Calories</label>
                                        <input
                                            type="text"
                                            name={caloriesId}
                                            data-idx={idx}
                                            id={caloriesId}
                                            className="calories form-row-element"
                                            value={mealState[idx].calories}
                                            onChange={e => onMealChange(e)}
                                        />
                                    </div>
                                    <div className='col-sm-1'>
                                        <button className="button buttonRnd delete margintop"><i className="material-icons" onClick={e => del(e,idx)}>delete_outline</i></button>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                    <div className="row">
                        <input type="submit" className="btn submit" value="Submit" />
                    </div>
                </form>
                <div className="row">
                    <button className="btn danger" onClick={e => goBack(e)}>Close</button>
                </div>
            </div>
        </Fragment>
    ) : null;
};

EditMealModal.propTypes = {
    createMeallist: PropTypes.func.isRequired,
    meallist: PropTypes.object.isRequired,
    ddate: PropTypes.object.isRequired/*,
    setEditToggle: PropTypes.func.isRequired,
    editToggle: PropTypes.object.isRequired*/
};

const mapStateToProps = (state) => ({
    ddate: state.ddate,
    meallist: state.meallist//,
    //editToggle: state.editToggle
});

export default connect(mapStateToProps, { createMeallist, /*setEditToggle*/ })(EditMealModal);