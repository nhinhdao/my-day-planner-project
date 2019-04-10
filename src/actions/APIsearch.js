import axios from 'axios';
import history from '../components/history';
const BASEURL = 'http://localhost:3001/api/v1';
const HEADERS = {
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_YELP_TOKEN}`
  }
};

export function placesSearchQuery(url) {
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return axios.get(url, HEADERS)
      .then(resp => dispatch({ type: 'FETCH_PLACES_SEARCH_QUERY', payload: resp.data.businesses }))
      .catch(error => console.log(error));
  }
}

export function singleSearchQuery(url) {
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return axios.get(url, HEADERS)
      .then(resp => dispatch({ type: 'FETCH_SINGLE_SEARCH_QUERY', payload: resp.data}))
      .catch(error => console.log(error));
  }
}

export function reviewSearchQuery(url) {
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return axios.get(url, HEADERS)
      .then(resp => dispatch({ type: 'FETCH_REVIEW_SEARCH_QUERY', payload: resp.data.reviews }))
      .catch(error => console.log(error));
  }
}

export function addToListQuery(place, reviews) {
  const userID = localStorage.getItem("userID");
  // debugger
  let newPlace = {
    user_id: userID,
    code: place.code,
    name: place.name,
    category: place.category,
    contact: place.contact,
    location: place.location,
    rating: place.rating,
    photos: place.photos,
    isAddedToList: true,
    reviews: reviews
  };
  const url = `${BASEURL}/users/${userID}/places`;
  // body: JSON.stringify(newProject)
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return axios.post(url, newPlace)
      .then(place => dispatch({ type: "ADD_TO_MY_LIST", payload:  place.data}))
      .catch(error => console.log(error));
  }
}

export function removeFromListQuery(place) {
  const userID = localStorage.getItem("userID");
  const url = `${BASEURL}/users/${userID}/places/${place.id}`;
  // debugger
  // body: JSON.stringify(newProject)
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return axios.delete(url)
      .then(() => dispatch({
        type: "REMOVE_FROM_MY_LIST",
        payload: place
      }))
      .catch(error => console.log(error));
  }
}

export function getCurrentUser(id) {
  const url = `${BASEURL}/users/${id}`;
  return dispatch => {
    dispatch({
      type: "LOADING_QUERY"
    });
    return axios.get(url)
      .then(resp => dispatch({
          type: 'GET_CURRENT_USER',
          payload: resp.data
        })
      );
  }
}

export function getSavedPlaces() {
  const userID = localStorage.getItem("userID")
  const url = `${BASEURL}/users/${userID}/places`;
  return dispatch => {
    dispatch({
      type: "LOADING_QUERY"
    });
    return axios.get(url)
      .then(resp => dispatch({
        type: 'GET_SAVED_PLACES',
        payload: resp.data
      }));
  }
}

export function getAllTimetables() {
  const userID = localStorage.getItem("userID")
  const url = `${BASEURL}/users/${userID}/timetables`;
  return dispatch => {
    dispatch({
      type: "LOADING_QUERY"
    });
    return axios.get(url)
      .then(resp => dispatch({
        type: 'GET_ALL_TIMETABLES',
        payload: resp.data
      }));
  }
}

export function createNewTimetable(name) {
  const userID = localStorage.getItem("userID");
  const url = `${BASEURL}/users/${userID}/timetables`;
  // body: JSON.stringify(newProject)
  return dispatch => {
    dispatch({ type: "LOADING_QUERY" });
    return axios.post(url, {name: name, user_id: userID})
      .then(place => dispatch({ type: "CREATE_NEW_TIMETABLE", payload:  place.data}))
      .catch(error => console.log(error));
  }
}

export function getSingleTimetable(id) {
  const userID = localStorage.getItem("userID")
  const url = `${BASEURL}/users/${userID}/timetables/${id}`;
  return dispatch => {
    dispatch({
      type: "LOADING_QUERY"
    });
    return axios.get(url)
      .then(resp => dispatch({
        type: 'GET_SINGLE_TIMETABLE',
        payload: resp.data
      }));
  }
}

export function updateUserAccount(user) {
  const id = localStorage.getItem('userID');
  const url = `${BASEURL}/users/${id}`;
  return dispatch => {
    dispatch({
      type: "LOADING_QUERY"
    });
    return fetch(url, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(resp => {
        localStorage.setItem("userImage", resp.image);
        localStorage.setItem("userUsername", resp.username);
        dispatch({
          type: "UPDATE_USER_ACCOUNT",
          resp
        });
      })
  }
}

export function signIn(user) {
  const url = `${BASEURL}/login`;
  return dispatch => {
    dispatch({
      type: "LOADING_QUERY"
    });
    return axios.post(url, user)
      .then(resp => {
          // set userId to localstorage for accessing its projects later
          localStorage.setItem("userID", parseInt(resp.data.id));
          // Update redux sore with return data
          dispatch({
            type: 'SIGN_IN',
            payload: resp.data
          });
          // history.push("/search")
        }).catch((error) => {
          console.log('error ' + error);
        });
  }
}

export function signOut() {
  const url = `${BASEURL}/logout`;
  return dispatch => {
    dispatch({
      type: "LOADING_QUERY"
    });
    return axios.post(url)
      .then(() => dispatch({
        type: 'SIGN_OUT'
      }))
  }
}

export function register(user) {
  const url = `${BASEURL}/signup`;
  return dispatch => {
    dispatch({
      type: "LOADING_QUERY"
    });
    return axios.post(url, user)
      .then(resp => {
          // set userId to localstorage for accessing its projects later
          localStorage.setItem("userID", parseInt(resp.data.id));
          // Update redux sore with return data
          dispatch({
            type: 'REGISTER_NEW_USER',
            payload: resp.data
          });
          history.push("/");
        });
  }
}