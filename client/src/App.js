import React, { PureComponent } from "react";
import "./App.css";

class App extends PureComponent {
  state = { URL: "", keyword: "", scrapeResponse: "", loading: false };

  formatUrl = url => {
    if (!/^https?:\/\//i.test(url)) {
      return "http://" + url;
    } else {
      return url;
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { URL, keyword } = this.state;
    //prepend http if missing in search query
    const formattedUrl = this.formatUrl(URL);
    const response = await fetch("/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        URL: formattedUrl,
        keyword: keyword
      })
    });
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    this.setState({ scrapeResponse: body, loading: false });
  };

  render() {
    const { scrapeResponse, loading } = this.state;
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
          <div
            style={
              loading ? { visibility: "visible" } : { visibility: "hidden" }
            }
          >
            Loading...
          </div>
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
