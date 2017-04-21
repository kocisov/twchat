const CHANGE = 'twchat/mount/CHANGE';

export default function mount(
  state = {
    UsersBox: false,
    Interface: false,
    ChatBox: false,
  },
  action
) {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        ...action.obj,
      };

    default:
      return state;
  }
}

export function changeMountState(componentName, _state) {
  return {
    type: CHANGE,
    obj: {
      [componentName]: _state,
    },
  };
}
