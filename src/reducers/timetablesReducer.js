export default function timetableReducer(state = defaultState, action) {
  let resp;
  switch (action.type) {
    case "LOADING_QUERY":
      return {
        ...state,
        loading: true
      }
    case "GET_ALL_TIMETABLES":
      resp = action.payload;
      return {
        ...state,
        all: resp,
        error: false,
        loading: false
      }
    case "GET_SINGLE_TIMETABLE":
      resp = action.payload;
      return {
        ...state,
        timetable: resp,
        error: false,
        loading: false
      }
    case "CREATE_NEW_TIMETABLE":
    // debugger
      resp = action.payload;
      return {
        ...state,
        timetable: resp,
        error: false,
        loading: false
      }
    default:
      return state;
  }
}

const defaultState = {
  all: [],
  timetable: {},
  error: false,
  loading: false
}