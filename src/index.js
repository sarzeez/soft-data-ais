import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import store from "./redux/store";
import i18n from "i18next";
import {useTranslation, initReactI18next} from "react-i18next";
import LanguageDetectot from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';


import Auth from './Auth'



i18n
    .use(initReactI18next)
    .use(LanguageDetectot)
    .use(HttpApi)
    .init({
        supportedLngs: ['uz', 'en', 'ru'],
        fallbackLng: "en",
        detection: {
            order: ['htmlTag', 'cookie', 'localStorage', 'subdomain', 'path'],
            caches: ['cookie']
        },
        backend: {
            loadPath: '/assets/locales/{{lgn}}/translation.json',
        },
        react: {useSuspense: false}
    });





ReactDOM.render(
    <Provider store={store}>
        <Auth/>
    </Provider>,
    document.getElementById("root")
);