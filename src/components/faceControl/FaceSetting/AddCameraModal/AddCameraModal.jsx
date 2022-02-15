import {Form, Input, Select} from "antd";
import React, {useEffect, useState} from "react";
import {ip} from "../../../../ip";

import Modal from "react-modal";
import axios from "axios";
import './addCameraModal.css';

import russia from "../../../../images/russia.svg";
import uzbek from "../../../../images/uzbek.svg";
import engliz from "../../../../images/engliz.svg";


const AddCameraModal = (props) => {

    const {
        isOpenAddCamera,
        setIsOpenAddCamera,
        cameraIntialValues,
        setCameraInitialValues,
        getCameraData,
        cameraPaginationCurrent,
    } = props;


    const lang = localStorage.getItem('i18nextLng');
    const [cameraSetting, setCameraSetting] = useState([]);

    const cancel = () =>{
        setIsOpenAddCamera(!isOpenAddCamera)
        setCameraInitialValues({
            name_uz: '',
            name_ru: '',
            name_en: '',
            type: '',
            group_id: '',
            ip_address: '',
            username: '',
            password: ''
        })
    }

    const getCameraGroup = async () =>{
        const response = await axios.get(`${ip}/api/camera_group`)
        const { data } = response;
        setCameraSetting(data)
    }

    const onFinish = (values) => {
        if(cameraIntialValues.edit) {
            axios.put(`${ip}/api/cameras/${cameraIntialValues.id}`, {
                ...values,
            })
                .then(response => {
                    // item edited
                    cancel()
                    getCameraData(cameraPaginationCurrent)
                })
                .catch(err => {
                    console.log(err?.response?.data)
                })
        }
        else {
            axios.post(`${ip}/api/cameras`, values)
                .then(response => {
                    cancel()
                    getCameraData()
                })
                .catch(err => {
                    console.log(err?.response?.data)
                })
        }
    }

    const onFinishFailed = (e) => {
        // console.log(e)
    }


    useEffect(()=>{
        getCameraGroup();
    }, [])

    return (
        <>
            <Modal
                isOpen={isOpenAddCamera}
                onRequestClose={() => setIsOpenAddCamera(!isOpenAddCamera)}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={0}
            >

                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={cameraIntialValues}
                    requiredMark = 'optional'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                <div className="camera_settings_modal_content">
                    <div className="camera_settings_modal_title">
                        Kamera parametrlari
                    </div>
                    <div className="camera_settings_modal_inputs">
                        <h4 className="settings_modal_input_label" >Kamera nomi</h4>
                        <div className="camera_groups_language">
                            <Form.Item
                                label={false}
                                name="name_uz"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your gender!',
                                    },
                                ]}
                            >
                                <Input className="camera_language_input" placeholder="Kiriting" prefix={<img src={uzbek} alt="uz"/>} />
                            </Form.Item>
                            <Form.Item
                                label={false}
                                name="name_ru"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your gender!',
                                    },
                                ]}
                            >
                                <Input className="camera_language_input" placeholder="Kiriting" prefix={<img src={russia} alt="uz"/>} />
                            </Form.Item>
                            <Form.Item
                                label={false}
                                name="name_en"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your gender!',
                                    },
                                ]}
                            >
                                <Input className="camera_language_input" placeholder="Kiriting" prefix={<img src={engliz} alt="uz"/>} />
                            </Form.Item>
                        </div>

                        <Form.Item
                            className="settings_modal_input_label"
                            label="Kamera turi"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your gender!',
                                },
                            ]}
                        >
                            <Select
                                className="settings_modal_select"
                                size="large"
                                placeholder="Tanlash"
                            >
                                <Select.Option value="dahua">Dahua</Select.Option>
                                <Select.Option value="hikvision">Hikvision</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="setting_input_lebel_groups">
                            <Form.Item
                                className="settings_modal_input_label"
                                label="Guruh"
                                name="group_id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your gender!',
                                    },
                                ]}
                            >
                                <Select
                                    className="settings_modal_select"
                                    size="large"
                                    placeholder="Tanlash"
                                >

                                    {
                                        cameraSetting && cameraSetting.map((item, index) => (
                                            <Select.Option key={index} value={item.id}>{item[`name_${lang}`]}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                className="settings_modal_input_label"
                                label="IP manzili"
                                name="ip_address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input camera name!',
                                    },
                                ]}
                            >
                                <Input
                                    className="settings_modal_input"
                                    size="large"
                                    placeholder="Kiritish"
                                    style={{borderRadius: '5px'}}
                                />
                            </Form.Item>
                        </div>

                        <div className="setting_input_lebel_groups">
                            <Form.Item
                                className="settings_modal_input_label"
                                label="Login"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input camera name!',
                                    },
                                ]}
                            >
                                <Input
                                    className="settings_modal_input"
                                    size="large"
                                    placeholder="Kiritish"
                                    style={{borderRadius: '5px'}}
                                />
                            </Form.Item>
                            <Form.Item
                                className="settings_modal_input_label"
                                label="Parol"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    },
                                    ]}
                            >
                                <Input
                                    className="settings_modal_input"
                                    size="large"
                                    placeholder="Kiritish"
                                    style={{borderRadius: '5px'}}
                                />
                            </Form.Item>

                        </div>

                        <div className="add_camera_buttons">
                            <button type="button" onClick={cancel} className="add_camera_buttons_cancle">Bekor qilish</button>
                            <button type="submit"  className="add_camera_buttons_save">Saqlash</button>
                        </div>
                    </div>
                </div>
                </Form>
            </Modal>
        </>
    );
};

export default AddCameraModal;