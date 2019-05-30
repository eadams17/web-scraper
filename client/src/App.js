import React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  state = { URL: "", keyword: "", response: "" };

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { URL, keyword } = this.state;
    const response = await fetch("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        URL: URL,
        keyword: keyword
      })
    });
    const body = await response.text();
    this.setState({ response: body });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="input-container">
            <div>URL</div>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ URL: e.target.value })}
            />
          </div>
          <div className="input-container">
            <div>Keyword</div>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ keyword: e.target.value })}
            />
          </div>
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <div>{this.state.response}</div>
      </div>
    );
  }
}

export default App;
