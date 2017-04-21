import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaperAP from 'react-icons/lib/io/paper-airplane';
import './index.css';

class Say extends Component {
  state = {
    val: '',
  };

  handleChange = e => {
    this.setState({
      val: e.target.value,
    });
  };

  handlePress = e => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  };

  handleSubmit = e => {
    const { client } = this.props;

    client.say('kociqq', this.state.val).then(() => {
      this.setState({
        val: '',
      });
    });
  };

  render() {
    return (
      <div className="say-plugin">
        <input
          className="sp-text"
          type="text"
          onChange={this.handleChange}
          onKeyPress={this.handlePress}
          value={this.state.val}
          placeholder="Your message..."
        />
        <button className="sp-btn" onClick={this.handleSubmit}>
          <PaperAP width={20} height={20} />
          Send message
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

export default connect(mapStateToProps)(Say);
