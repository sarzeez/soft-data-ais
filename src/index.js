import React, { Suspense } from 'react';
import {positions, Provider} from "react-alert";
import { Provider as ReduxProvider } from 'react-redux'
import AlertTemplate from "react-alert-template-basic";
import store from "./redux/store";
import ReactDOM from 'react-dom';
import './index.css';
import './assets/custom-css/custom-antd.css';
import './i18n';

import Auth from './Auth';

const options = {
    timeout: 5*1000,
    position: positions.TOP_CENTER,
    containerStyle: {
        zIndex: 1009999
    }
};

ReactDOM.render(
    <ReduxProvider store={store} >
        <Suspense fallback={<div>Loading...</div>}>
            <Provider template={AlertTemplate} {...options}>
            <Auth/>
            </Provider>
        </Suspense>
    </ReduxProvider>,
    document.getElementById("root")
);