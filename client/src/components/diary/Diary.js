import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentMeallist } from '../../actions/meallist';
import { deleteMeallist } from '../../actions/meallist';
import { setDate } from '../../actions/ddate';
import { loadUser } from '../../actions/auth';
import { MealItem } from '../meal-form/MealItem';
import EditMealModal from '../modal/EditMealModal';
//import { setEditToggle } from '../../actions/editToggle';

const Diary = ({ getCurrentMeallist, deleteMeallist, auth: { user }, meallist: { meallist, loading }, ddate: { ddate }, setDate, history  /*editToggle*/}) => {

    /*let defaultDate = ''

    if (ddate !== '')
    {
        defaultDate = ddate.ddate.toString();
        console.log(defaultDate);

    }
    else
    {
        defaultDate = moment().format('YYYY-MM-D');
        console.log(defaultDate);
    }*/


    const [formDate, setFormDate] = useState(
        ddate
    );

    const [modalToggle, setModalToggle] = useState(false);

    const onDateChange = (e) => {
        const updatedDate = e.target.value;
        setFormDate(updatedDate);
        setDate(updatedDate);
    }

    const del = (e) => {
        deleteMeallist(meallist.id);
    }

    const toggle = () => {
        //if meallist exists
        setModalToggle(!modalToggle);
    }

    useEffect(() => {
        getCurrentMeallist(formDate, user);

    }, [getCurrentMeallist, user, formDate]);


    const sumCalories = () => {
        if (meallist != null)
        {
            let list = meallist.MealList;
            var sum = 0;
            //update total calories
            for(var i = 0; i < list.length ;i++) {
                console.log(meallist.MealList[i]);
                sum += meallist.MealList[i].calories;
            }

            return sum
        }
        else
        {
            return "";
        }
    }

    return loading && meallist === null ?
        <Spinner />
        : <Fragment>
            <h1> Diary</h1>
            <p className="lead"> Welcome {user && user.name} </p>
            <div className="container">
                <div className='row'>
                    <input type="date" name="formDate" value={formDate} onChange={e => onDateChange(e)} /*minLength="6"*/ />
                </div>
            </div>
            {meallist !== null ?
                <Fragment>

                {meallist.MealList !== null ?
                        <div className='cell'>
                            <div className='container'>
                                <div className='row mealitemHeader'>
                                    <div className='col-sm-1'>
                                    </div>
                                    <div className='col-sm-4'>
                                        Meal
                                    </div>
                                    <div className='col-sm-4'>
                                        Calories
                                    </div>
                                </div>
                                <div className='botDivider'>
                                {
                                    meallist.MealList.map((meal, index) => {
                                        const mealObj = {}
                                        mealObj.meal = meal
                                        mealObj.id = index
                                        return <MealItem meal={meallist.MealList[index]} key={index} listNum={index+1} />
                                    })
                                }
                                </div>
                                <div className='row mealitemHeader'>
                                    <div className='col-sm-1'>
                                        Total:
                                    </div>
                                    <div className='col-sm-4'>
                                        {sumCalories()}
                                    </div>
                                </div>

                                <div className='row cell-submit'>
                                    <button className="button buttonRnd edit"><i className="material-icons" onClick={e => toggle(e)}>edit</i></button>
                                    <button className="button buttonRnd delete"><i className="material-icons" onClick={e => del(e)}>delete_outline</i></button>
                                </div>
                                <div className="row"><button className="btn" onClick={e => history.push("/create-meallist")}>Plan</button></div>
                            </div>
                        </div>
                        :
                        <div>nothing</div>
                    }
                </Fragment> :
                <Fragment>
                    <p>No meals for this day</p>
                    <button className="btn" onClick={e => history.push("/create-meallist")}>Plan</button>
                </Fragment>
            }
            { modalToggle === true ? 
                <Fragment>
                    <EditMealModal modalToggle={modalToggle} setModalToggle={setModalToggle} />
                </Fragment> :
                <Fragment></Fragment>
            }
        </Fragment>
};

Diary.propTypes = {
    getCurrentMeallist: PropTypes.func.isRequired,
    deleteMeallist: PropTypes.func.isRequired,
    setDate: PropTypes.func.isRequired,
    //setEditToggle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    meallist: PropTypes.object.isRequired,
    ddate: PropTypes.object.isRequired//,
    //editToggle: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    meallist: state.meallist,
    ddate: state.ddate//,
    //editToggle: state.editToggle
});

export default connect(mapStateToProps, { getCurrentMeallist, deleteMeallist, setDate, /*setEditToggle*/ })(Diary);