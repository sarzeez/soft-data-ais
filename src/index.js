import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/custom-css/custom-antd.css'
import {Provider} from "react-redux";
import store from "./redux/store";
import './i18n'

import Auth from './Auth'


ReactDOM.render(
    <Provider store={store}>
        <Suspense fallback={<div>Loading...</div>}>
            <Auth/>
        </Suspense>
    </Provider>,
    document.getElementById("root")
);