import React, { Component } from 'react';
import { connect } from 'react-redux';
import Thermo from 'react-icons/lib/io/thermometer';
import './index.css';

class Ban extends Component {
  state = {
    val: '',
  };

  handleChange = e => {
    this.setState({
      val: e.target.value,
    });
  };

  banUser = () => {
    const { client } = this.props;
    client.ban('kociqq', this.state.val, 'Banned from app!');
  };

  render() {
    return (
      <div className="ban-plugin">
        <input
          className="ban-input"
          type="text"
          onChange={this.handleChange}
          value={this.state.val}
          placeholder="Username"
        />
        <button className="btn-main" onClick={this.banUser}>
          <Thermo width={19} height={19} />
          Ban this user
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

export default connect(mapStateToProps)(Ban);
