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
                    <h1 className='access_control_add_staff_terminal_modal_title'>Terminal parametrlari</h1>

                    <div className="access_control_add_terminal_modal_bodiy">
                        <div className="access_control_add_terminal_modal_item">
                            <Form.Item
                                label="Eshik nomi"
                                name="door_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Eshik nomini kiriting',
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Kiriting"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Yo’nalishi"
                                name="direction"
                                rules={[
                                    {
                                        required: true,
                                        message: "Yo'nalishni  tanlang",
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Tanlang"
                                >
                                    <Select.Option value="Entry">{t("Kirish")}</Select.Option>
                                    <Select.Option value="Exit">Chiqish</Select.Option>
                                </Select>
                            </Form.Item>
                        </div>

                        <div className="access_control_add_terminal_modal_item">
                            <Form.Item
                                label="Terminal IP manzili"
                                name="ip_address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Terminal IP manzil kiriting',
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Kiriting"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Terminal turi"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: "Terminal turini tanlang",
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    placeholder="Tanlang"
                                >
                                    <Select.Option value="dahua">Dahua</Select.Option>
                                    <Select.Option value="hikvision">Hikvision</Select.Option>
                                </Select>
                            </Form.Item>

                        </div>

                        <Form.Item
                            label="Autentifikatsiya turi"
                            name="auth_type"
                            rules={[
                                {
                                    required: true,
                                    message: "Autentifikatsiya turini tanlang",
                                },
                            ]}
                        >
                            <Select
                                size="large"
                                placeholder="Tanlang"
                            >
                                <Select.Option value="0">Yuz</Select.Option>
                                <Select.Option value="1">Barmoq izi</Select.Option>
                                <Select.Option value="2">ID karta</Select.Option>
                                <Select.Option value="3">Yuz va Barmoq izi</Select.Option>
                                <Select.Option value="4">Yuz yoki Barmoq izi</Select.Option>
                                <Select.Option value="5">Yuz va ID karta</Select.Option>
                                <Select.Option value="6">Yuz yoki ID karta</Select.Option>
                                <Select.Option value="7">Barmoq izi va ID karta</Select.Option>
                                <Select.Option value="8">Barmoq izi yoki ID karta</Select.Option>
                                {/*<Select.Option value="9">Yuz va Barmoq izi va ID karta</Select.Option>*/}
                                <Select.Option value="10">Yuz yoki Barmoq izi yoki ID karta</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="access_control_add_terminal_modal_item">
                            <Form.Item
                                label="Login"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Eshik nomini kiriting',
                                    },
                                ]}
                            >
                                <Input
                                    size="large"
                                    placeholder="Kiriting"
                                />
                            </Form.Item>
                            <Form.Item
                                label="Parol"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Parol kititing',
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
                            <button onClick={cancel} type='button'>Bekor qilish</button>
                            <button type='submit'>Saqlash</button>
                        </div>
                </div>
            </Form>
        </Modal>
    );
};

export default AddTerminalModal;