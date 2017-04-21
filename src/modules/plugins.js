export const ACTIVATE = 'twchat/plugins/ACTIVATE';
export const DEACTIVATE = 'twchat/plugins/DEACTIVATE';

export default function plugins(
  state = [
    // lolled at this
    'Connect(ChatBox)',
    'Connect(Say)',
    'Connect(UsersBox)',
  ],
  action
) {
  switch (action.type) {
    case ACTIVATE:
      return [...state, action.pluginName];
    case DEACTIVATE:
      return state.filter(el => el !== action.pluginName);
    default:
      return state;
  }
}

export function activatePlugin(pluginName) {
  return {
    type: ACTIVATE,
    pluginName,
  };
}

export function deactivatePlugin(pluginName) {
  return {
    type: DEACTIVATE,
    pluginName,
  };
}
