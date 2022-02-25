import React from 'react';
import Modal from "react-modal";
import { Form, Input, Select } from 'antd';
import {useTranslation} from "react-i18next";



import './terminal.css'

Modal.setAppElement("#root");


const AddTerminal = ({ isOpenAddTerminal, setIsOpenAddTerminal }) => {

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
            shouldCloseOnOverlayClick={false}
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
                <div className='access_control_add_staff_terminal_modal'>
                    <h1 className='access_control_add_staff_terminal_modal_title'>ID karta qo’shish</h1>
                    <div className='access_control_add_staff_terminal_modal_body'>
                        <Form.Item
                            label="Karta turi:"
                            name="card_type"
                            rules={[
                            {
                                required: true,
                                message: t('Karta turuni tanlang'),
                            },
                            ]}
                        >
                            <Select
                                size="large"
                            >
                                <Select.Option value="1">Mifare</Select.Option>
                                <Select.Option value="2">EM-Marin</Select.Option>
                                <Select.Option value="3">RFID</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Karta raqami"
                            name="card_id"
                            rules={[
                            {
                                required: true,
                                message: t('Karta raqamini kiriting'),
                            },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Kiriting"
                            />
                        </Form.Item>
                        <div className='access_control_add_staff_terminal_modal_body_buttons'>
                            <button onClick={() => {setIsOpenAddTerminal(false)}} type='button'>Bekor qilish</button>
                            <button type='submit'>Saqlash</button>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal>
    )
};

export default AddTerminal;
