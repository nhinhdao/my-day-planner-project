export default function getAllProjectsReducer(state = {
  places: [],
  place: {},
  loading: false
}, action) {
  let data, place, updatedProject;
  switch (action.type) {
    case 'LOADING_QUERY':
      return {
        ...state,
        loading: true
      }
    case 'GET_SAVED_PLACES':
      data = action.payload.map(place =>
        data = {
          id: place.id,
          name: place.name,
          category: place.category,
          contact: place.contact,
          location: place.location,
          rating: place.rating,
          photos: place.photos,
          time: place.time
        }
      );
      return {
        ...state,
        places: data,
        loading: false
      };
    case 'GET_PROJECT':
      data = action.payload;
      place = {
        id: place.id,
        name: place.name,
        category: place.category,
        contact: place.contact,
        location: place.location,
        rating: place.rating,
        photos: place.photos,
        time: place.time
      }
      return {
        ...state,
        place: place,
        loading: false
      };
    case 'UPDATE_PROJECT':
      data = action.payload;
      updatedProject = {
        id: data.id,
        name: data.name,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        owner: data.owner,
        tasks: data.tasks
      }
      return {
        ...state,
        places: state.places.map(place => {
          if (place.id === data.id) {
            return updatedProject
          }
          return place;
        })
      };
    case 'DELETE_PROJECT':
      return {
        ...state,
        places: state.places.filter(place => place.id !== action.placeID)
      };
    default:
      return state;
  }
}