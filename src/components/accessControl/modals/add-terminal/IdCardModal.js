import React from 'react';
import Modal from "react-modal";
import { Form, Input, Select } from 'antd';
import {useTranslation} from "react-i18next";


import './terminal.css'

Modal.setAppElement("#root");


const IdCardModal = (props) => {

    const {
        isOpenAddTerminal,
        setIsOpenAddTerminal,
        card,
        setCard
    }=props

    const {t} = useTranslation()

    const onFinish = (value) => {
        const { id, type } = value;
        const newData = [...card, {
            key: card.length + 1,
            type: type,
            id: id
        }]
        setCard(newData)
        setIsOpenAddTerminal(!isOpenAddTerminal);
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }

    const cancel = () =>{
        setIsOpenAddTerminal(!isOpenAddTerminal)
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
                            name="type"
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
                                <Select.Option value="Mifare">Mifare</Select.Option>
                                <Select.Option value="EM-Marin">EM-Marin</Select.Option>
                                <Select.Option value="RFID">RFID</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Karta raqami"
                            name="id"
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

export default IdCardModal;
