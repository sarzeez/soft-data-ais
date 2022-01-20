import {
    GET_THEME,
    IS_REFRESH
} from "./themeTypes";

export const getTheme =(data) =>{
    return {
        type: GET_THEME,
        payload: data
    }
}

export const isRefresh =(data) =>{
    return {
        type: IS_REFRESH,
        payload: data
    }
}