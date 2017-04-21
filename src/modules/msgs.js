const NEW_FOLLOWER = 'twchat/msgs/NEW_FOLLOWER';
const CHANGE_STATE = 'twchat/msgs/CHANGE_STATE';

export default function msgs(
  state = {
    msg: '',
    show: false,
  },
  action
) {
  switch (action.type) {
    case NEW_FOLLOWER:
      return {
        ...state,
        msg: `${action.newFollower} just followed!`,
      };

    case CHANGE_STATE:
      return {
        ...state,
        show: action.state,
      };

    default:
      return state;
  }
}

export function changeMsgState(t) {
  return {
    type: CHANGE_STATE,
    state: t,
  };
}
