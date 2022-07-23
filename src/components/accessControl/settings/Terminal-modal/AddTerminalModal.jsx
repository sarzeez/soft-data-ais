import React from 'react';
import {Form, Input, Select} from "antd";
import {useTranslation} from "react-i18next";
import {ip} from "../../../../ip";
import { useAlert } from 'react-alert';
import Modal from "react-modal";
import axios from "axios";

import './addTerminal.css';


const AddTerminalModal = ( props ) => {
    const {
        isOpenAddTerminal,
        setIsOpenAddTerminal,
        terminalTableIntialValues,
        setTerminalTableIntialValues,
        getTerminalData,
        terminalPaginationCurrent,
    } = props

    const {t} = useTranslation();
    const alert = useAlert();


    const cancel = () =>{
        setIsOpenAddTerminal(!isOpenAddTerminal)
        setTerminalTableIntialValues({
            door_name: '',
            direction: '',
            auth_type: '',
            ip_address: '',
            type: '',
            username: '',
            password: '',
        })
    }

    const onFinish = (values) => {
        if(terminalTableIntialValues.edit){
            axios.put(`${ip}/api/terminals/${terminalTableIntialValues.id}`, {
                ...values
            })
                .then(response =>{
                    cancel()
                    getTerminalData(terminalPaginationCurrent)
                })
                .catch(err => {
                    alert.error('Ip manzil mavjud!')
                    console.log(err?.response?.data)
                })
        }
        else {
            axios.post(`${ip}/api/terminals`, values)
                .then(response =>{
                    cancel()
                    getTerminalData(terminalPaginationCurrent)
                })
                .catch(err =>{
                    alert.error('Ip manzil xato kiritildi !')
                    console.log(err?.response?.data)
                })
        }
    }

    const onFinishFailed = (error) => {
        console.log(error)
    } 

    return (
        <Modal
            isOpen={isOpenAddTerminal}
            onRequestClose={() => setIsOpenAddTerminal(cancel)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={300}
        >
            <Form
                name="basic"
                layout="vertical"
                initialValues={terminalTableIntialValues}
                requiredMark = 'optional'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className='access_control_add_terminal_modal'>
                    <h1 className='access_control_add_staff_terminal_modal_title'>{t("Terminal parametrlari")}</h1>

                    <div className="access_control_add_terminal_modal_bodiy">
                        <div className="access_control_add_terminal_modal_item">
                            <Form.Item
                                label={t("Eshik nomi")}
                                name="door_name"
                                rules={[
                                    {
                                        required: true,
                                        message: t('Eshik nomini kiriting'),
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder={t("Kiriting")}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t("Yo’nalishi")}
                                name="direction"
                                rules={[
                                    {
                                        required: true,
                                        message: t("Yo'nalishni tanlang"),
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder={t("Tanlang")}
                                >
                                    <Select.Option value="Entry">{t("Kirish")}</Select.Option>
                                    <Select.Option value="Exit">{t("Chiqish")}</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="access_control_add_terminal_modal_item">
                            <Form.Item
                                label={t("Terminal IP manzili")}
                                name="ip_address"
                                rules={[
                                    {
                                        required: true,
                                        message: t('Terminal IP manzil kiriting'),
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder={t("Kiriting")}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t("Terminal turi")}
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: t("Terminal turini tanlang"),
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder={t("Tanlang")}
                                >
                                    <Select.Option value="dahua">Dahua</Select.Option>
                                    <Select.Option value="hikvision">Hikvision</Select.Option>
                                </Select>
                            </Form.Item>

                        </div>

                        <Form.Item
                            label={t("Autentifikatsiya turi")}
                            name="auth_type"
                            rules={[
                                {
                                    required: true,
                                    message: t("Autentifikatsiya turini tanlang"),
                                },
                            ]}
                        >
                            <Select
                                size="large"
                                placeholder={t("Tanlang")}
                            >
                                <Select.Option value="1">{t("Yuz")}</Select.Option>
                                <Select.Option value="2">{t("Barmoq izi")}</Select.Option>
                                <Select.Option value="3">{t("ID karta")}</Select.Option>
                                <Select.Option value="4">{t("Yuz va Barmoq izi")}</Select.Option>
                                <Select.Option value="5">{t("Yuz yoki Barmoq izi")}</Select.Option>
                                <Select.Option value="6">{t("Yuz va ID karta")}</Select.Option>
                                <Select.Option value="7">{t("Yuz yoki ID karta")}</Select.Option>
                                <Select.Option value="8">{t("Barmoq izi va ID karta")}</Select.Option>
                                <Select.Option value="9">{t("Barmoq izi yoki ID karta")}</Select.Option>
                                <Select.Option value="10">{t("Yuz yoki Barmoq izi yoki ID karta")}</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="access_control_add_terminal_modal_item">
                            <Form.Item
                                label={t("Login")}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: t('Login kiriting'),
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder={t("Kiriting")}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t("Parol")}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: t('Parol kiriting'),
                                    },
                                ]}
                            >
                                <Input.Password
                                    size="large"
                                />
                            </Form.Item>
                        </div>
                    </div>

                        <div className='access_control_add_staff_terminal_modal_body_buttons'>
                            <button className="add_terminal_cancel_button" onClick={cancel} type='button'>{t("Bekor qilish")}</button>
                            <button className="add_terminal_save_button" type='submit'>{t("Saqlash")}</button>
                        </div>
                </div>
            </Form>
        </Modal>
    );
};

export default AddTerminalModal;