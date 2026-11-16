# Day 5: Code Review

## Improvements to consider

- **Handle broken or unexpected saved history.** `JSON.parse` in `saveToHistory` and `loadHistory` can throw if local storage contains invalid JSON, and `localStorage` can be unavailable or full. Guard these operations so a storage problem doesn’t stop the app. (`app.js:157`)
- **Validate API response data before rendering it.** `displayWeather` assumes fields such as `weather[0]`, `main`, and `wind` exist. A malformed response could cause a runtime error after the request succeeds. (`app.js:82`)
- **Make location errors more specific.** The geolocation error callback uses the same message for denied permission, timeout, and unavailable location. It also has no timeout option. (`app.js:203`)
- **Improve accessibility feedback.** Add status and alert semantics to the loading and error elements so assistive technology can announce updates. (`index.html:25`)
- **Make the API key strategy clearer.** The key is included in browser requests, so visitors can inspect it even though `config.js` is git-ignored. The README mentions this; a backend proxy would keep the key private. (`README.md:53`)
- **Split responsibilities as the app grows.** `app.js` currently handles API calls, rendering, storage, and event listeners. Moving these into separate modules would make changes easier to follow and maintain.
- **Add automated checks.** Tests for failed requests, malformed responses, storage errors, and forecast grouping would help catch regressions.
