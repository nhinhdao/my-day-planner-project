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

// export function addToListQuery(id) {
//   return dispatch => {
//     dispatch({ type: "ADD_TO_MY_LIST", id });

// }

export function addToListQuery(place) {
  const userID = localStorage.getItem("userID");
  debugger
  let newPlace = {
    user_id: userID,
    name: place.name,
    category: place.category,
    contact: place.contact,
    location: place.location,
    rating: place.rating,
    photos: place.photos
  };
  const url = `${BASEURL}/users/${userID}/places`;
  // body: JSON.stringify(newProject)
  return dispatch => {
    dispatch({ type: "ADD_TO_MY_LIST", payload: place.id });
    return axios.post(url, newPlace)
      .then(place => console.log("successfully create place and reviews" + place.data))
      .catch(error => console.log(error));
  }
}

export function createReviews(reviews) {
  let sortedReviews = reviews.map(review => review = {
    user_name: review.user.name,
    user_image: review.user.image_url,
    text: review.text,
    time_created: review.time_created,
    rating: parseInt(review.rating)
  }
  );
  debugger
  for (var i = 0; i < sortedReviews.length; i++) {
    postReview(sortedReviews[i])
  }
}

export function removeFromListQuery(id) {
  return { type: "REMOVE_FROM_MY_LIST", id }
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


export const deleteProject = (projectID) => {
  const url = `${BASEURL}/projects/${projectID}`;
  return dispatch => {
    dispatch({
      type: "LOADING_QUERY"
    });
    return fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: projectID
        })
      })
      .then(resp => {
        dispatch({
          type: "DELETE_PLACE",
          projectID: resp.id
        });
        // history.push("/projects");
      });
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
          localStorage.setItem("userID", parseInt(resp.id));
          // Update redux sore with return data
          dispatch({
            type: 'SIGN_IN',
            payload: resp.data
          });
          history.push("/search")
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
      .then(resp => dispatch({
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
          localStorage.setItem("userID", parseInt(resp.id));
          // Update redux sore with return data
          dispatch({
            type: 'REGISTER_NEW_USER',
            payload: resp.data
          });
          history.push("/");
        });
  }
}


function postReview(review){
  const userID = localStorage.getItem('userID');
  const url = `${BASEURL}/users/${userID}/reviews`;
  axios.post(url, review)
  .then(resp => console.log('create review ' + resp.data))
  .catch(error => console.log(error));
}