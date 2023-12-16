import { Api } from "../../utils/api"
import { SET_NOTES_DATA, SET_NOTES_ERROR, SET_NOTES_LOADING } from "./const"

export const getNotes = (params, fn) => {
    return async dispatch => {
        dispatch({ type: SET_NOTES_LOADING })
        try {
            const payload = await Api.getNotes(params);
            dispatch({ type: SET_NOTES_DATA, payload })
        } catch (error) {
            dispatch({ type: SET_NOTES_ERROR, payload: error })
        }
    }
}
