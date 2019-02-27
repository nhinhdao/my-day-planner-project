export default function mySearchReducer(state={searchData: [], loading: false}, action) {
  switch (action.type) {
    case 'LOADING_QUERY':
      return { ...state, loading: true}
    case 'FETCH_MY_SEARCH_QUERY':
      let data = action.payload.map(data => data = { id: data.id, name: data.name, category: data.categories[0] ? data.categories[0].title : 'N/A', image: data.image_url});
      return { ...state, searchData: data, loading: false };
    default:
      return state;
  }
}
