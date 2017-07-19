import React, { Component } from 'react';
import { connect } from 'react-redux';
import { parse } from 'twitch-emoji';
import Trash from 'react-icons/lib/io/trash-a';
import * as msgActions from '../../modules/messages';
import { changeMountState } from '../../modules/mount';
import bttv from '../../static/bttv.json';
import './index.css';

let defaultColors = [
  '#FF0000',
  '#0000FF',
  '#008000',
  '#B22222',
  '#FF7F50',
  '#9ACD32',
  '#FF4500',
  '#2E8B57',
  '#DAA520',
  '#D2691E',
  '#5F9EA0',
  '#1E90FF',
  '#FF69B4',
  '#8A2BE2',
  '#00FF7F',
];

let randomColorsChosen = {};

function emoteParser(msg) {
  const base = `https://cdn.betterttv.net/emote/`;
  const size = '1x';
  let _msg = msg;

  // eslint-disable-next-line
  msg.split(/\s+/).map(t => {
    // eslint-disable-next-line
    bttv.emotes.filter(emote => t === emote.code).map(e => {
      if (e.id && e.id.length > 0) {
        _msg = msg.replace(
          t,
          `<img className="twitch-emoji" src="${base}/${e.id}/${size}" alt="">`
        );
      }
    });
  });

  return parse(_msg, {
    emojiSize: 'small',
  });
}

function resolveColor(chan, name, color) {
  if (color !== null) {
    return color;
  }

  if (!(chan in randomColorsChosen)) {
    randomColorsChosen[chan] = {};
  }

  if (name in randomColorsChosen[chan]) {
    color = randomColorsChosen[chan][name];
  } else {
    color = defaultColors[Math.floor(Math.random() * defaultColors.length)];
    randomColorsChosen[chan][name] = color;
  }

  return color;
}

class ChatBox extends Component {
  componentDidUpdate(f) {
    const d = document.getElementById('messages-box');

    let sh = d.scrollHeight;
    let ch = d.clientHeight;
    let st = d.scrollTop;

    if (ch + st + 70 >= sh) {
      d.scrollTop = sh;
    } else if (f === 1) {
      d.scrollTop = sh;
    }
  }

  removeAllMessages = () => {
    const { clearMessages } = this.props;
    clearMessages();
  };

  componentDidMount() {
    const { client, newMessage, mounted, changeMountState } = this.props;

    if (mounted) {
      this.componentDidUpdate(1);
      return false;
    }

    client.on('chat', (ch, us, msg, slf) => {
      const color = resolveColor(ch, us.username, us.color);

      newMessage({
        channel: ch,
        userState: us,
        color,
        msg,
      });
    });

    changeMountState('ChatBox', true);
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="chat-box">
        <div
          style={{
            marginBottom: '4px',
          }}
          className="flex-r"
        >
          <h2>Chat</h2>
          <button className="btn-main" onClick={this.removeAllMessages}>
            <Trash width={20} height={20} />

          </button>
        </div>
        <div className="messages-box" id="messages-box">
          {messages.map((message, i) => {
            let nm = message.userState['display-name'];
            return (
              <div className="cb-message" key={i}>
                <div
                  style={{
                    color: message.color,
                  }}
                  className="cb-user-name"
                >
                  {nm !== null ? nm : message.userState.username}
                </div>
                <div className="cb-divider">
                  -
                </div>
                <div
                  className="cb-user-message"
                  dangerouslySetInnerHTML={{
                    __html: emoteParser(message.msg),
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    mounted: state.mount.ChatBox,
    messages: state.messages,
    client: state.client,
  };
}

export default connect(mapStateToProps, {
  ...msgActions,
  changeMountState,
})(ChatBox);
