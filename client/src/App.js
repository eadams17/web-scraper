import React, { PureComponent } from "react";
import "./App.css";

class App extends PureComponent {
  state = { URL: "", keyword: "", scrapeResponse: "" };

  handleSubmit = async e => {
    e.preventDefault();
    const { URL, keyword } = this.state;
    const response = await fetch("/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        URL: URL,
        keyword: keyword
      })
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    this.setState({ scrapeResponse: body });
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
              onChange={e => this.setState({ URL: e.target.value })}
            />
          </div>
          <div className="input-container">
            <div className="label">Keyword</div>
            <input
              type="text"
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
              <th id="url">
                <a
                  href={scrapeResponse.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {scrapeResponse && scrapeResponse.URL}
                </a>
              </th>
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
