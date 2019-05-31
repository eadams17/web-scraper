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

  renderTable(scrapeResponse) {
    return (
      <div>
        <div>
          <div>Timestamp</div>
          <div>{scrapeResponse.timeRecord}</div>
        </div>
        <div>
          <div>URL</div>
          <div>{scrapeResponse.URL}</div>
        </div>
        <div>
          <div>Keyword</div>
          <div>{scrapeResponse.keyword}</div>
        </div>
        <div>
          <div># of Instances</div>
          <div>{scrapeResponse.wordCount}</div>
        </div>
      </div>
    );
  }

  render() {
    const { scrapeResponse } = this.state;
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
        {scrapeResponse && this.renderTable(scrapeResponse)}
      </div>
    );
  }
}

export default App;
