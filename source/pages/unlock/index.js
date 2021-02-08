import React from "react";
import browser from "webextension-polyfill";
import { HashRouter, Link, Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";
import utils from "../../lib/utils";

import "./styles.scss";

class Unlock extends React.Component {
  constructor(props) {
    super(props);
    this.history = createHashHistory();
    this.state = {
      password: "",
      error: "",
    };
  }

  handlePasswordChange(event) {
    this.setState({ error: null, password: event.target.value });
  }

  unlock() {
    utils
      .call("unlock", { password: this.state.password })
      .then(() => {
        this.history.push("/home");
      })
      .catch((e) => {
        this.setState({ error: e.message });
      });
  }

  render() {
    return (
      <div>
        <h2>Unlock:</h2>
        <input
          type="text"
          value={this.state.password}
          onChange={(event) => this.handlePasswordChange(event)}
        />
        <button
          onClick={(e) => {
            this.unlock();
          }}
        >
          Unlock
        </button>
        <p>{this.state.error}</p>
      </div>
    );
  }
}

export default Unlock;