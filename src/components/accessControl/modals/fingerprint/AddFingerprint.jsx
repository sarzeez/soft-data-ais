import React, {useState} from 'react';
import {Form, Input, Select,} from "antd";
import Modal from "react-modal";
import finger2 from '../../../../images/finger2.svg';


import './fingerprint.css';
import {BiCheck, IoCloseSharp} from "react-icons/all";
import axios from "axios";
import {ip} from "../../../../ip";

const AddFingerprint = ({isOpenAddFingerprint, setIsOpenAddFingerprint, data, setData}) => {

    const [loading, setLoading] = useState(false)
    const [requestedFinger, setRequestedFinger] = useState(null)
    const [accessFinger, setAccsessFinger] = useState('');

    const handleClickFingerprint = () =>{
        setLoading(true)
        axios.post(`${ip}/api/terminal/fingerprint/`)
            .then(res=>{
                setLoading(false)
                setRequestedFinger(res.data)
                setData({...data})
            })
            .catch(err=>{
                setLoading(false)
            })
    }

    const onFinish = (value) => {
        console.log(value)
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }

    return (
        <Modal
            isOpen={isOpenAddFingerprint}
            onRequestClose={() => setIsOpenAddFingerprint(false)}
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
                            name="fingrprint_name"
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
                                    placeholder = "Terminalni tanlang"
                                >
                                    <Select.Option value="1">HiTech</Select.Option>
                                    <Select.Option value="2">SoftData</Select.Option>
                                </Select>
                            </Form.Item>
                            <button
                                type='button'
                                className="fingerprint_button"
                                style={{cursor: `${accessFinger === '' ? 'not-allowed' : 'pointer'}`}}
                                onClick={handleClickFingerprint}
                                disabled={accessFinger === '' ? true : false}
                            >
                                <img style={{marginRight: 8}} src={finger2} alt=""/>
                                Barmoq izi olish
                            </button>
                        </div>

                        {/*<div className="finger_info">*/}
                        {/*    <div className="round">*/}
                        {/*        <BiCheck style={{color: 'white', fontSize: 20}} />*/}
                        {/*    </div>*/}
                        {/*    <h3>Barmoq izi qo’shildi</h3>*/}
                        {/*</div>*/}

                        {/*<div className="finger_info_close">*/}
                        {/*    <div className="round_close">*/}
                        {/*        <IoCloseSharp style={{color: 'white', fontSize: 20}} />*/}
                        {/*    </div>*/}
                        {/*    <h3>Barmoq izi qo’shildi</h3>*/}
                        {/*</div>*/}

                        <div className='addFinger_save_button'>
                            <button className="addFinger_button" type='submit'>Saqlash</button>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal>
    )
};

export default AddFingerprint;