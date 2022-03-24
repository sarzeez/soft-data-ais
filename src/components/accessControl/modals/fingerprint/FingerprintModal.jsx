import React, {useState} from 'react';
import {Form, Input, Select,} from "antd";
import {ip} from "../../../../ip";

import Modal from "react-modal";
import finger2 from '../../../../images/finger2.svg';
import axios from "axios";
import {BiCheck, IoCloseSharp} from "react-icons/all";

import './fingerprint.css';

const FingerprintModal = (props) => {

    const {
        isOpenAddFingerprint,
        setIsOpenAddFingerprint,
        data,
        setData,
        terminalIPList
    } = props;

    const [requestedFinger, setRequestedFinger] = useState(null);
    const [accessFinger, setAccessFinger] = useState('');


    const onChangeFingerprint = (a) =>{
        setAccessFinger(a)
    }

    const handleClickFingerprint = () => {
         axios.post(`${ip}/api/terminal/fingerprint/${accessFinger}`)
            .then(res => {
                console.log(res.data);
                setRequestedFinger(res.data);
            })
            .catch(err=>{
                // setLoading(false)
            })
    }

    const onFinish = (value) => {
                const { name } = value;
                if(requestedFinger) {
                    setData([...data, {key: data.length + 1, name: name, file: requestedFinger}])
                    setIsOpenAddFingerprint(!isOpenAddFingerprint);
                    setRequestedFinger(null);
                }
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }
    const cancel = () =>{
        setIsOpenAddFingerprint(!isOpenAddFingerprint);
    }

    return (
        <Modal
            isOpen={isOpenAddFingerprint}
            onRequestClose={() => setIsOpenAddFingerprint(cancel)}
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
                    <h1 className='access_control_add_staff_terminal_modal_title'>Barmoq izi qo’shish</h1>
                    <div className='access_control_add_staff_terminal_modal_body'>
                        <Form.Item
                            label="Barmoq izi nomi"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Barmoq izi nomini kiriting',
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder="Kiriting"
                            />
                        </Form.Item>
                        <div className="fingerprint_buttonaccess_control_add_staff_fingerprint_bInput">
                            <Form.Item
                                name="terminal_type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Terminalni tanlang',
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    value={accessFinger}
                                    onChange={onChangeFingerprint}
                                    placeholder = "Terminalni tanlang"
                                >
                                    <Select.Option value="">Tanlash</Select.Option>
                                    {
                                        terminalIPList?.map((item, index) => (
                                            <Select.Option key = {index} value={item.value}>{item.title}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <button
                                type='button'
                                className="fingerprint_button"
                                style={{
                                    color: `${accessFinger === '' ? '#000':'#fff'}`,
                                    backgroundColor: `${accessFinger === '' ? '#fff':'#29B85D'}`
                                }}
                                onClick={handleClickFingerprint}
                            >
                                <img style={{marginRight: 8}} src={finger2} alt=""/>
                                Barmoq izi olish
                            </button>
                        </div>

                        {
                            requestedFinger?
                                <div className="finger_info">
                                    <div className="round">
                                        <BiCheck style={{color: 'white', fontSize: 20}} />
                                    </div>
                                    <h3>Barmoq izi qo’shildi</h3>
                                </div>
                                :
                                <div className="finger_info_close">
                                    <div className="round_close">
                                        <IoCloseSharp style={{color: 'white', fontSize: 20}} />
                                    </div>
                                    <h3>Barmoq izi qo’shilmagan</h3>
                                </div>
                        }


                        <div className='addFinger_save_button'>
                            <button className="addFinger_button" type='submit'>Saqlash</button>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal>
    )
};

export default FingerprintModal;