import { Api } from "../../utils/api"
import { SET_USER_DATA, SET_USER_ERROR, SET_USER_LOADING } from "./const"

export const login = (params) => {
    return async dispatch => {
        dispatch({ type: SET_USER_LOADING })
        try {
            const payload = await Api.getUser(params);
            dispatch({ type: SET_USER_DATA, payload });
        } catch (err) {
            dispatch({ type: SET_USER_ERROR, payload: err })
        }
    }
}

