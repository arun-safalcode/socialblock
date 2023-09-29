
import { LOGIN, SIGNUP, SCANNER } from "../../config/urls";
import { apiPost, clearUserData, setUserData } from "../../utils/utils";
import store from "../store";
import types from "../types";

const { dispatch } = store


export const saveUserData = (data) => {
    dispatch({
        type: types.LOGIN,
        payload: data
    })
}

export function login(data) {
    return new Promise((resolve, reject) => {
        return apiPost(LOGIN, data).then((res) => {
            if (res) {
                setUserData(res).then(() => {
                    resolve(res)
                    saveUserData(res)
                });
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}

export function scanner(data){
    return new Promise((resolve, reject) => {
        return apiPost(SCANNER, data).then((res) => {
            if (res) {
                    resolve(res)
                return
            }
            resolve(res)
        }).catch((error) => {
            reject(error)
        })
    })
}


export function logout(){
    dispatch({type: types.CLEAR_REDUX_STATE})
    clearUserData()
}