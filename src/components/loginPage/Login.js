import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'

import { ip } from '../../ip'

import loginImg from '../../images/loginLeft.png';
import google from '../../images/googleIcon.png';
import loginIcon from '../../images/userIcon.png';
import lickIcon from '../../images/lockIcon.png'

import softlogo from '../../images/softdatalogo.png'
import './login.css'


const Login = ({ setUser }) => {
    const [token, setToken] = useState(null)
    const [error, setError] = useState(false)

    const initialValues = {
        login: '',
        password: ''
    }
    const validationSchema = Yup.object({
        login: Yup.string().required('login kritilmagan ...'),
        password: Yup.string().required('parol kiritilmagan...'),
    })

    const onSubmit = (values) => {
        axios.post(`${ip}/api/sign-in`, {
            login: values.login,
            password: values.password
         })
             .then(res => {
                 setToken(res.data.accessToken)
                 localStorage.setItem('soft-ais-token', res.data.accessToken)
             })
            .catch(err => {
                setError(true)
            })
     }

     useEffect(() => {
        if(localStorage.getItem('soft-ais-token')) {
            axios.get(`${ip}/api/me`, {headers: { 'x-access-token': localStorage.getItem('soft-ais-token')}})
                .then(res => {
                    setUser(res.data.data)
                    console.log(res.data)
                })
                .catch(err => {
                    // console.log(err)
                })
        }
    }, [token])

    return (
        <div className="login_page">
            <div className="page_left">
                <img  className="left_img" src={loginImg} alt=""/>

                <img className="left_img_logo" src={softlogo} alt=""/>
            </div>

            <div className="page_right">
                <div className="rihgt_inner">
                    <div className="titles">
                        {/*<div className="title_top"  >Xush kelibsiz,</div>*/}
                        <div className="title">Tizimga kirish</div>
                    </div>
                    <div className="login_forms">
                        <Formik
                            initialValues = {initialValues}
                            onSubmit = {onSubmit}
                            validationSchema = {validationSchema}
                        >
                            {
                                formik => {
                                    return <Form >
                                        <div className="login_page_inputs">
                                            <div className="login_inputs_wrapper">
                                                {/*{*/}
                                                {/*    error && <Alert severity="error">логин ёки парол хато</Alert>*/}
                                                {/*}*/}
                                                <div className="login_control">
                                                    <label className="login_label" >Логин</label>
                                                    <div className="login_input">
                                                        <img className="login_icon" src={loginIcon} alt=""/>
                                                        <Field
                                                            type = "login"
                                                            id = "login"
                                                            name = "login"
                                                            placeholder="Loginni kiriting"
                                                            autoComplete="off"
                                                        />
                                                        <ErrorMessage name = "login" component = 'div' style={{color: 'red'}}  className = "error" />
                                                    </div>
                                                </div>
                                                <div className="login_control">
                                                    <label className="login_label" >Пароль</label>
                                                    <div className="parol_input">
                                                        <img className="login_icon" src={lickIcon} alt=""/>
                                                        <Field
                                                            type="password"
                                                            id = "password"
                                                            name = "password"
                                                            placeholder="Parolni kiriting"
                                                            autoComplete="off"
                                                        />
                                                        <ErrorMessage name = "password" component = 'div' style={{color: 'red'}} className = "error" />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className = "login_buttons" >
                                                <button
                                                    type = 'submit'
                                                    className = "in_button"
                                                >
                                                    Kirish
                                                </button>

                                                <button type='button' className="google_button">
                                                    <img src={google} alt=""/>
                                                    Google akkount orqali
                                                </button>
                                        </div>

                                        <div className="sign_text">
                                            <p className="sign">Siz ro’yxatdan o’tmaganmisiz?  </p>
                                            <a href="/#12" className="sign_up" style={{color: '#29B85D'}} > Ro’yxatdan o’tish</a>
                                        </div>
                                    </Form>
                                }
                            }

                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;