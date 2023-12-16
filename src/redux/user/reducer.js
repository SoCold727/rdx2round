import { SET_USER_DATA, SET_USER_ERROR, SET_USER_LOADING } from "./const"

const initialState = {
  loading: false,
  data: null,
  error: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER_DATA:
      return { ...state, loading: false, error: null, data: payload }
    case SET_USER_ERROR:
      return { ...state, loading: false, error: payload }
    case SET_USER_LOADING:
      return { ...state, loading: true }
    default:
      return state
  }
}
