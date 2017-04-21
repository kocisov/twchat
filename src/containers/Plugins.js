import React, { Component } from 'react';
import { connect } from 'react-redux';

import TitleBar from '../components/TitleBar';
import { Content, _plugins, _components } from './Interface';

const plgs = [..._plugins, ..._components];

import { deactivatePlugin, activatePlugin } from '../modules/plugins';

class Plugins extends Component {
  render() {
    const { plugins, dispatch } = this.props;

    return (
      <div>
        <TitleBar />
        <Content>
          <div className="plugins-box">
            {plgs.map((_plugin, i) => (
              <div className="plugin-info" key={i}>
                Plugin
                <b>
                  {_plugin.displayName
                    .replace(/[{()}]/g, '')
                    .replace(/Connect/g, '')}
                </b>
                <div className="plugin-info-l">
                  {plugins.includes(_plugin.displayName)
                    ? <button
                        onClick={() =>
                          dispatch(deactivatePlugin(_plugin.displayName))}
                      >
                        Deactivate
                      </button>
                    : <button
                        onClick={() =>
                          dispatch(activatePlugin(_plugin.displayName))}
                      >
                        Activate
                      </button>}
                </div>
              </div>
            ))}
          </div>
        </Content>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    plugins: state.plugins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plugins);
