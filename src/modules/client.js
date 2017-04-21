const CALL = 'twchat/client/NEW_CALL';

const _client = window.tmi.client({
  options: {
    debug: true,
    clientId: process.env.REACT_APP_TMICID,
  },
  connection: {
    reconnect: true,
  },
  identity: {
    username: 'kociqq',
    password: process.env.REACT_APP_TMIOA,
  },
  channels: ['kociqq'],
});

export default function client(state = _client, action) {
  switch (action.type) {
    case CALL:
      return action.newClient;
    default:
      return state;
  }
}

export function newCall(newClient) {
  return {
    type: CALL,
    newClient,
  };
}
