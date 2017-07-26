import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatBoxes from 'react-icons/lib/io/chatboxes';
import { newMessage } from '../../modules/messages';

class FakeMessages extends Component {
  fakeSpam = () => {
    const { newMessage } = this.props;

    for (let i = 0; i < 15; i++) {
      newMessage({
        userState: {
          'display-name': '*KociQQ',
        },
        msg: 'Hello Kappa',
      });
    }
  };

  render() {
    return (
      <button className="btn-main fakemessages" onClick={this.fakeSpam}>
        <ChatBoxes width={19} height={19} />
        Fake messages
      </button>
    );
  }
}

export default connect(null, {
  newMessage,
})(FakeMessages);
