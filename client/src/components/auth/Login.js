import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    const register = e => {
        history.push("/register");
    }

    // Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/diary" />
    }

    return (
        <Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <div className="center"><img className="loginLogo" src={require('../../imgs/Logo.png')} /></div>
                        <form onSubmit={e => onSubmit(e)}>
                            <label className="inputLabel">Email Address</label>
                            <div className="form-group">
                                <input type="text" name="email"  value={email} onChange={e => onChange(e)} required/>
                            </div>
                            <label className="inputLabel">Password</label>
                            <div className="form-group">
                                <input type="password" name="password" value={password} onChange={e => onChange(e)} minLength="6"/>
                            </div>
                            <div className="row">
                                <div className="col-sm-6 fullL"><input type="submit" className="fullBtn" value="LOGIN"/></div>
                                <div className="col-sm-6 fullR"><button className="fullBtn" onClick={e => register(e)}>SIGN UP</button></div>
                            </div>
                        </form>

                    </div>     
                    <div className="col-sm-3"></div>
                </div>
            </div>
        </Fragment>
    );
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);