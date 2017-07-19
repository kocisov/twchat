import React, { Component } from 'react';
import { connect } from 'react-redux';
import Clock from 'react-icons/lib/io/clock';
import './index.css';

class Slow extends Component {
  state = {
    trnslow: 'Turn slow on',
    val: '',
    slow: false,
  };

  handleChange = e => {
    this.setState({
      val: e.target.value,
    });
  };

  turnSlow = ms => {
    const { client } = this.props;
    const { slow } = this.state;

    if (slow) {
      client.slowoff('kociqq');

      this.setState(s => ({
        trnslow: 'Turn on slowmode',
        slow: false,
      }));

      return false;
    }

    client.slow('kociqq', ms > 0 ? ms : 10);

    this.setState(s => ({
      trnslow: '&nbsp; Turn off slowmode',
      slow: true,
    }));
  };

  render() {
    return (
      <div className="slow-plugin">
        <input
          className="slow-input"
          type="text"
          onChange={this.handleChange}
          value={this.state.val}
          placeholder="Seconds"
        />
        <button
          className="btn-main"
          onClick={() => this.turnSlow(this.state.val)}
        >
          <Clock width={19} height={19} />
          {this.state.trnslow}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.client,
  };
}

export default connect(mapStateToProps)(Slow);
