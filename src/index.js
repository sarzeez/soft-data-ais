import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./redux/store";

import Auth from './Auth'


ReactDOM.render(
    <Provider store={store}>
        <Auth/>
    </Provider>,
    document.getElementById("root")
);