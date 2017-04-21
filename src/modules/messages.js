const NEW_MESSAGE = 'twchat/messages/NEW_MESSAGE';
const CLEAR = 'twchat/messages/CLEAR';

export default function plugins(state = [], action) {
  switch (action.type) {
    case NEW_MESSAGE:
      return [
        ...state,
        {
          msg: action.data.msg,
          channel: action.data.channel,
          userState: action.data.userState,
          color: action.data.color,
        },
      ];

    case CLEAR:
      return [];

    default:
      return state;
  }
}

export function newMessage(obj) {
  return {
    type: NEW_MESSAGE,
    data: obj,
  };
}

export function clearMessages() {
  return {
    type: CLEAR,
  };
}
