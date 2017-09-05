import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeMountState } from '../modules/mount'
import Ban from '../plugins/Ban'
import ChatBox from '../plugins/ChatBox'
import FakeMessages from '../plugins/FakeMessages'
import Say from '../plugins/Say'
import Slow from '../plugins/Slow'
import TitleBar from '../components/TitleBar'
import UsersBox from '../plugins/UsersBox'
import 'isomorphic-fetch'

export const _components = [ChatBox, UsersBox]
export const _plugins = [Say, Slow, Ban, FakeMessages]

export const Content = ({ children }) => (
  <div className="content">{children}</div>
)

class Interface extends Component {
  componentDidMount() {
    const { client, mounted, changeMountState } = this.props

    if (mounted) {
      return false
    }

    setTimeout(() => {
      fetch('https://api.twitch.tv/kraken/channels/kociqq/follows', {
        method: 'GET',
        headers: {
          'Client-ID': process.env.REACT_APP_TMICID,
        },
      })
        .then(a => a.json())
        .then(data => {
          console.log(data)
        })
    }, 1000)

    client.connect()

    changeMountState('Interface', true)
  }

  render() {
    const { plugins } = this.props

    return (
      <div>
        <TitleBar />
        <Content>
          <div className="components">
            {_components.map((Plugin, i) => {
              if (plugins.includes(Plugin.displayName)) {
                return <Plugin key={i} />
              } else {
                return ``
              }
            })}
          </div>
          <div className="plugins">
            {_plugins.map((Plugin, i) => {
              if (plugins.includes(Plugin.displayName)) {
                return <Plugin key={i} />
              } else {
                return ``
              }
            })}
          </div>
        </Content>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mounted: state.mount.Interface,
    client: state.client,
    plugins: state.plugins,
  }
}

export default connect(mapStateToProps, {
  changeMountState,
})(Interface)
