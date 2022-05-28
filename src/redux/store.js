import { createStore, combineReducers,  } from 'redux';
import themeReducer from "./theme/themeReducer";
import {managmentReducer} from "./onlineManag/managmentReducer";

// import {applyMiddleware, compose} from "redux";
// import thunk from "redux-thunk";
//

const rootReducer = combineReducers ({
    theme: themeReducer,
    terminal : managmentReducer,
})

const store = createStore(rootReducer);

export default store;

