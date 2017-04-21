import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default () => (
  <div className="tb-full">
    <div className="title-bar">
      Twitch chat app
      <div className="flex-r flex-right">
        <b>{process.env.REACT_APP_TWITCHNAME}</b>
        <img
          className="bb-img"
          src="https://static-cdn.jtvnw.net/jtv_user_pictures/kociqq-profile_image-5797dba5b2304870-300x300.png"
          alt=""
        />
      </div>
    </div>
    <ul className="under-title-bar">
      <li>
        <Link to="/">
          Main
        </Link>
      </li>
      <li>
        <Link to="/plugins">
          Plugins
        </Link>
      </li>
    </ul>
  </div>
);
