const JOINED = 'twchat/viewers/JOINED';

export default function mount(
  state = {
    count: 0,
    viewers: [],
  },
  action
) {
  switch (action.type) {
    case JOINED:
      return {
        count: action.count,
        viewers: action.users,
      };

    default:
      return state;
  }
}

export function callAfterJoin(data) {
  return {
    type: JOINED,
    ...data,
  };
}
