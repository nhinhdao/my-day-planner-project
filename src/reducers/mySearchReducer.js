export default function mySearchReducer(state = defaultState, action) {
  let places, singlePlace, data;
  switch (action.type) {
    case 'LOADING_QUERY':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_PLACES_SEARCH_QUERY':
      data = action.payload.map(data => data = {
        id: null,
        code: data.id,
        name: data.name,
        category: data.categories[0] ? data.categories[0].title : 'N/A',
        isAddedToList: false
      });
      return {
        ...state,
        places: data,
        loading: false
      };
    case 'FETCH_SINGLE_SEARCH_QUERY':
      data = action.payload;
      let searchItem = {
        id: null,
        code: data.id,
        name: data.name,
        contact: data.display_phone,
        category: data.categories[0].title,
        location: data.location.display_address.join(", "),
        rating: data.rating,
        photos: data.photos,
        isAddedToList: false,
        reviews: []
      }
      return {
        ...state,
        singlePlace: searchItem,
        loading: false
      };
    case 'ADD_TO_MY_LIST':
      places = [...state.places.map(place => {
        if (place.code !== action.payload.code) {
          return place
        }
        return {
          ...place,
          isAddedToList: true
        }
      })];
      singlePlace = {
        ...action.payload
      };
      return {
        ...state,
        places: places,
        singlePlace: singlePlace,
        loading: false
      };
    case 'REMOVE_FROM_MY_LIST':
      places = [...state.places.map(place => {
        if (place.code !== action.payload.code) {
          return place
        }
        return {
          ...place,
          isAddedToList: false
        }
      })];
      singlePlace = {
        ...state.singlePlace,
        isAddedToList: false
      };
      return {
        ...state,
        places: places,
        singlePlace: singlePlace,
        loading: false
      };
    case 'UPDATE_PLACE':
      data = action.payload;
      return {
        ...state,
        singlePlace: data,
        loading: false
      };
    case 'GET_SAVED_PLACES':
      return {
        ...state,
        myList: action.payload,
        loading: false
      };
    case "FETCH_REVIEW_SEARCH_QUERY":
      return {
        ...state,
        loading: false,
        reviews: action.payload
      }
    default:
      return state;
  }
}

const defaultState = {
  places: [],
  singlePlace: {},
  myList: [],
  reviews: [],
  loading: false
}