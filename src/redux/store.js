import { createStore, combineReducers,  } from 'redux';
import themeReducer from "./theme/themeReducer";

const rootReducer = combineReducers ({
    theme: themeReducer,
})

const store = createStore(rootReducer);


export default store;