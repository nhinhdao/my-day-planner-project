export function mySearchQuery(url) {
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: 'FETCH_MY_SEARCH_QUERY', payload: data.response.venues }));
  }
}

export function singleSearchQuery(url) {
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: 'FETCH_SINGLE_SEARCH_QUERY', payload: data.response.venue }));
  }
}

export function recommendedSearchQuery(url) {
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return fetch(url)
      .then(response => response.json())
      .then(data => dispatch({ type: 'FETCH_RECOMMENDED_SEARCH_QUERY', payload: data.response.venues }));
  }
}