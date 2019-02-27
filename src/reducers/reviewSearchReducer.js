export default function reviewSearchReducer(state = {reviews: [], loading: false}, action) {
  switch (action.type) {
    case "LOADING_QUERY":
      return {...state, loading: true}
    case "FETCH_REVIEW_SEARCH_QUERY":
      return { ...state, loading: false, reviews: action.payload }
    default:
      return state;
  }
}