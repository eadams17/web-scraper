import React from "react";
import "./App.css";

class App extends React.Component {
  state = { URL: "", keyword: "", scrapeResponse: "" };

  handleSubmit = e => {
    e.preventDefault();
    const { URL, keyword } = this.state;
    fetch("/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        URL: URL,
        keyword: keyword
      })
    })
      .then(res => res.json())
      .then(response => this.setState({ scrapeResponse: response }));
  };

  render() {
    const { scrapeResponse } = this.state;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="form">
          <div className="input-container">
            <div className="label">URL</div>
            <input
              type="text"
              value={this.state.post}
              onChange={e => this.setState({ URL: e.target.value })}
            />
          </div>
          <div className="input-container">
            <div className="label">Keyword</div>
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
        <table>
          <tbody>
            <tr>
              <th>Timestamp</th>
              <th>{scrapeResponse && scrapeResponse.timeRecord}</th>
            </tr>
            <tr>
              <th>URL</th>
              <th id="url">{scrapeResponse && scrapeResponse.URL}</th>
            </tr>
            <tr>
              <th>Keyword</th>
              <th>{scrapeResponse && scrapeResponse.keyword}</th>
            </tr>
            <tr>
              <th># of Instances</th>
              <th>{scrapeResponse && scrapeResponse.wordCount}</th>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
