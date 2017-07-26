import React, { Component } from 'react';
import { connect } from 'react-redux';
import { callAfterJoin } from '../../modules/viewers';
import { changeMountState } from '../../modules/mount';
import 'isomorphic-fetch';
import './index.css';

class UsersBox extends Component {
  componentDidMount() {
    const { client, mounted, callAfterJoin, changeMountState } = this.props;

    if (mounted) {
      return false;
    }

    client.on('join', () => {
      client.api(
        {
          url: 'https://tmi.twitch.tv/group/user/kociqq/chatters',
        },
        (err, r, data) => {
          console.log(data);
          callAfterJoin({
            users: data.data.chatters.viewers,
            count: data.data.chatter_count,
          });
        }
      );
    });

    changeMountState('UsersBox', true);
  }

  render() {
    const { users, count } = this.props;

    return (
      <div className="users-box">
        <div className="users-box-info">
          <h2>Users in chat</h2>
          <h4>Current user count: {count}</h4>
        </div>
          {users.map((user, i) => (
            <div key={i}>
              <div className="ub-user-name">{user}</div>
            </div>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    count: state.viewers.count,
    users: state.viewers.viewers,
    mounted: state.mount.UsersBox,
    client: state.client,
  };
}

export default connect(mapStateToProps, {
  changeMountState,
  callAfterJoin,
})(UsersBox);
