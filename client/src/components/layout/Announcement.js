import React, { Fragment } from 'react';

const Announcement = (props) => {
  return (
    <div>
      <Fragment class="bg-yellow-light pt-2 pb-2 notice-bar border-yellow-darker border-b-2 ">
        <div class="container-max mx-auto text-center announcement">
          <p>
            <span role="img">📣</span> "I can't breathe" - George Floyd - #BLACK
            LIVES MATTER <span role="img">📣</span>{' '}
          </p>
        </div>
      </Fragment>
    </div>
  );
};

export default Announcement;
