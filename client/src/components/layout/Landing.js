import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {
    if(isAuthenticated){
        return <Redirect to='/Diary' />
    }

    return (
        <section className="landing">
            <div className="buttons">
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </div>
        </section>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(Landing);