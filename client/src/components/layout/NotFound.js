import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"> </i>
        Page Not Found
      </h1>
      <p className="large">Sorry, this page does not exist.</p>
      <p className="lead">
        <Link to="/" className="lead">
          Click here to go to the Home Page.
        </Link>
      </p>
    </Fragment>
  );
};

export default NotFound;
