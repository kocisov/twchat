import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default () => (
  <div className="tb-full">
    <div className="title-bar">
      Twitch chat app
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
