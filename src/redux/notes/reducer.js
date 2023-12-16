import { SET_NOTES_DATA, SET_NOTES_ERROR, SET_NOTES_LOADING } from "./const"

const initialState = {
    loading: false,
    data: [],
    error: null,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_NOTES_DATA:
            return { ...state, loading: false, error: null, data: payload }
        case SET_NOTES_ERROR:
            return { ...state, loading: false, error: payload }
        case SET_NOTES_LOADING:
            return { ...state, loading: true }
        default:
            return state
    }
}
