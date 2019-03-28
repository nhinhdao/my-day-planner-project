export function mySearchQuery(url) {
  const obj = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_TOKEN}`
    }
  }
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return fetch(url, obj)
      .then(response => response.json())
      .then(data => dispatch({ type: 'FETCH_MY_SEARCH_QUERY', payload: data.businesses }))
  }
}

export function singleSearchQuery(url) {
  const obj = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_TOKEN}`
    }
  }
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return fetch(url, obj)
      .then(response => response.json())
      .then(data => dispatch({ type: 'FETCH_SINGLE_SEARCH_QUERY', payload: data}));
  }
}

export function reviewSearchQuery(url) {
  const obj = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_YELP_TOKEN}`
    }
  }
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return fetch(url, obj)
      .then(response => response.json())
      .then(data => dispatch({ type: 'FETCH_REVIEW_SEARCH_QUERY', payload: data.reviews }));
  }
}

export function addToListQuery(id) {
  return { type: "ADD_TO_MY_LIST", id }
}

export function removeFromListQuery(id) {
  return { type: "REMOVE_FROM_MY_LIST", id }
}