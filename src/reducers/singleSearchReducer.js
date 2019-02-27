export default function singleSearchReducer(state={searchPlace: [], loading: false}, action) {
  switch (action.type) {
    case 'LOADING_QUERY':
      return { ...state, loading: true}
    case 'FETCH_SINGLE_SEARCH_QUERY':
      let data = action.payload;
      let searchItem = {
        id: data.id,
        name: data.name,
        contact: data.display_phone,
        category: data.categories[0].title,
        location: data.location.display_address.join(", "),
        rating: data.rating,
        photos: data.photos,
      }
      return { ...state, searchPlace: searchItem, loading: false };
    default:
      return state;
  }
}