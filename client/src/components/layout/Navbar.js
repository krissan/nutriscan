import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
                <ul className="navbar-nav navitems">
                    <li className="nav-item"><Link className="navLink" to='/Diary'>Diary</Link></li>
                    <li className="nav-item">
                        <a onClick={logout} href='#!' className="navLink">
                            <span className='hide-sm'>Logout</span>
                        </a>
                    </li>
                </ul>

    );

    const guestLinks = (
        <ul className="navbar-nav navitems">
            <li className="nav-item"><Link className="navLink" to='/login'>Login</Link></li>
            <li className="nav-item"><Link className="navLink" to='/register'>Sign Up</Link></li>
        </ul>
    );

    return (
        <nav className="navbar navbar-expand navbar-bg fixed-top">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6"><div className="navbar-brand navpad"><img className="navbarLogo" src={require('../../imgs/baseLogo.png')} /> Nutriscan</div></div>
                    <div className="col-sm-4">
                        {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
                    </div>
                </div>
            </div>
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);