export default function singleSearchReducer(state={searchPlace: [], loading: false}, action) {
  switch (action.type) {
    case 'LOADING_QUERY':
      return { ...state, loading: true}
    case 'FETCH_SINGLE_SEARCH_QUERY':
      let data = action.payload;
      let searchItem = {
        id: data.id,
        name: data.name,
        contact: data.contact.formattedPhone,
        location: data.location.formattedAddress.join(", "),
        rating: data.rating,
        description: data.description,
        photo: `https://fastly.4sqi.net/img/general/width600${data.photos.groups[1].items[0].suffix}`,
        tips: data.tips.groups[0].items[0].text
      }
      return { ...state, searchPlace: searchItem, loading: false };
    default:
      return state;
  }
}