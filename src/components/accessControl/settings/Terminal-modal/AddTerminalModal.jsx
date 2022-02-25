import React from 'react';
import {Form, Input, Select} from "antd";
import {useTranslation} from "react-i18next";
import Modal from "react-modal";

import './addTerminal.css';



const AddTerminalModal = ( props ) => {

    const {
        isOpenAddTerminal,
        setIsOpenAddTerminal,
    } = props

    const {t} = useTranslation()
    const onFinish = (value) => {
        console.log(value)
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }

    return (
        <Modal
            isOpen={isOpenAddTerminal}
            onRequestClose={() => setIsOpenAddTerminal(false)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={300}
        >
            <Form
                name="basic"
                layout="vertical"
                initialValues={{
                    remember: true
                }}
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
                                name="card_id"
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
                                name="card_type"
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
                                    <Select.Option value="1">Kirish</Select.Option>
                                    <Select.Option value="2">Chiqish</Select.Option>
                                </Select>
                            </Form.Item>

                        </div>

                        <div className="access_control_add_terminal_modal_item">
                            <Form.Item
                                label="Terminal IP manzili"
                                name="card_id"
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
                                name="card_type"
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
                                    <Select.Option value="1">Dahua</Select.Option>
                                    <Select.Option value="2">Hikvision</Select.Option>
                                </Select>
                            </Form.Item>

                        </div>

                        <Form.Item
                            label="Autentifikatsiya turi"
                            name="card_type"
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
                                <Select.Option value="1">Yuz, Barmoq izi</Select.Option>
                                <Select.Option value="2">Yuz, Barmoq izi, ID karta</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="access_control_add_terminal_modal_item">
                            <Form.Item
                                label="Login"
                                name="card_id"
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
                            <button onClick={() => {setIsOpenAddTerminal(false)}} type='button'>Bekor qilish</button>
                            <button type='submit'>Saqlash</button>
                        </div>
                </div>
            </Form>
        </Modal>
    );
};

export default AddTerminalModal;