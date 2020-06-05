import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  // debugger;
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">z-Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <p className="lead">
            Check the Creator{' '}
            <Link to="/profile/5eccd4c4672f18b60a4e7bc4" className="lead">
              here!
            </Link>
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// const mapStateToProps = (state) => {
//   debugger;
//   return {
//     isAuthenicated: state.auth.isAuthenticated,
//   };
// };

export default connect(mapStateToProps)(Landing);
