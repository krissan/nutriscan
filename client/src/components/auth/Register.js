import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2:'',
        birthdate: ''
    });

    const { name, email, password, password2, birthdate } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('passwords do not match', 'danger');
        }
        else {
            register({name, email, password, birthdate});
        }
    };

    if(isAuthenticated)
    {
        return <Redirect to='/dashboard'/>
    }

    return (
        <Fragment>
            <h1>Sign Up</h1>
            <p> Create Your Account </p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} /*required*//>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Email Address" name="email"  value={email} onChange={e => onChange(e)} /*required*//>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="password" name="password" value={password} onChange={e => onChange(e)} /*minLength="6"*//>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="password2" value={password2} onChange={e => onChange(e)} /*minLength="6"*//>
                </div>
                <div className="form-group">
                    <input type="date" placeholder="dd/mm/yyyy" name="birthdate" value={birthdate} onChange={e => onChange(e)} /*minLength="6"*//>
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to='/login'>Login</Link>
            </p>
        </Fragment>
    );
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);