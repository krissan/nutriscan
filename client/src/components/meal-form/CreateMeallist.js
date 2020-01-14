import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import { createMeallist } from '../../actions/meallist';
import { setDate } from '../../actions/ddate';


const CreateMeallist = ({ createMeallist, setDate, ddate, history }) => {
    const [formState, setFormState] = useState({formDate: ddate.ddate || ""})
    
    const onFormChange = (e) => setFormState ({
        ...formState,
        [e.target.name]: [e.target.value]
    });

    const blankMeal = {meal: '', calories: ''};
    const [mealState, setMealState] = useState(
        [{...blankMeal},]
    );

    const onMealChange = (e) => {
        const updatedMeals = [...mealState];
        //console.log(e.target.value);

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
        console.log(idx);
        const updatedMeals = [...mealState];
        updatedMeals.splice(e.data-idx,1);
        setMealState(updatedMeals);
        console.log(mealState);
    }


    const onSubmit = e => {
        e.preventDefault();
        setDate(formState.formDate.toString());
        createMeallist({ddate: formState.formDate.toString(), meallist: mealState}, history);
      };    


    return (
        <Fragment>
            <div className="row"><h1>Create Meal Plan For The Day</h1></div>
            <div className="row margintop"><small>* = required field</small></div>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="row margintop">
                    <input
                    type="date"
                    name="formDate"
                    value={formState.formDate}
                    id="formDate"
                    onChange={e => onFormChange(e)}
                    />
                </div>
                
                <div className="row">
                    <button className="btn" type="button" onClick={e => addMeal(e)}>Add Meal</button>
                </div>
                {
                    mealState.map((val, idx) => {
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
                                            className="meal"
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
                                            className="calories"
                                            value={mealState[idx].calories}
                                            onChange={e => onMealChange(e)}
                                        />
                                    </div>
                                    <div className='col-sm-1'>
                                        <button className="button buttonRnd delete"><i className="material-icons" onClick={e => del(e, idx)}>delete_outline</i></button>
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
                <Link className="btn primary" to="/diary">
                    Go Back
                </Link>
            </div>
        </Fragment>
    );
};

CreateMeallist.propTypes = {
    createMeallist: PropTypes.func.isRequired,
    setDate: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    ddate: state.ddate
});

export default connect(mapStateToProps, { createMeallist, setDate })(withRouter(CreateMeallist));