A small app that takes a URL and keyword and then scrapes that webpage to get the number of times the keyword appears.

## Setup

1. From the root directory, run `yarn run setup`
2. Run `yarn start`

The app should now be accessible from `http://localhost:3000/`

## Overview

This application is built using **React** on the frontend and **Node/Express** on the backend. It allows a user to enter any webpage URL with a keyword term; the application then scrapes that webpage and returns the following information to the user:

- the time at which the scrape was performed
- the URL that was used
- the keyword that was used
- the number of instances of that keyword on the page

Upon submitting the form data, a `fetch` request with `POST` method to the `/scrape` API is made to the Express server. The API then makes a `GET` request to the specified URL. The document body of the webpage is then received and parsed for instances of the keyword. A separate function handles finding the number of matches found in the body. A JSON object is then constructed and sent back to the frontend with `timeRecord`, `wordCount`, `URL` and `keyword` data.

## Technology

**React** is used for the frontend. I chose to use a `PureComponent` for performance optimization. The component has two main features: a form for the URL and keyword, and a table that is populated with the API response.

As for the backend, I chose to use **Node/Express**. Since this application serves a pretty basic function, I wanted to use a framework that was lightweight. Additionally, it's quick and easilty customizable. I also chose to use the **Cheerio** library due to its utility functions which allows for easy manipulation of DOM elements.

## Optimizations & Considerations

Some websites may have anti-scraping efforts in place so these will not return the desired result while the functionality of this application is at a basic level. There could also be some performance optimizations made for webpages with larger amounts of information.

Given more time, I would add better search functionality such as case-sensitive keyword matching. Additionally, I would store search parameters and results in a database for quick retrieval should the user peform the same search, or the user would like a history of their search results. I thoroughly enjoy robust design so I would definitely add rich styling and integrate interesting animations.
