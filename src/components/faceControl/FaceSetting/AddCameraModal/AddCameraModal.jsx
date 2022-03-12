import {Form, Input, Select} from "antd";
import React, {useEffect, useState} from "react";
import {ip} from "../../../../ip";
import {useTranslation} from "react-i18next";
import { useAlert } from 'react-alert';

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

    const alert = useAlert()
    const {t} = useTranslation();
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
                    cancel()
                    getCameraData(cameraPaginationCurrent)
                })
                .catch(err => {
                    alert.error('Ip manzil xato kiritildi !')
                    console.log(err?.response?.data)
                })
        }
        else {
            axios.post(`${ip}/api/cameras`, values)
                .then(response => {
                    cancel()
                    getCameraData(cameraPaginationCurrent)
                })
                .catch(err => {
                    alert.error('Ip manzil xato kiritildi !')
                    console.log(err?.response?.data)
                    // console.log(err?.response?.data?.msg.includes("ip_address"))
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
                        {t("Kamera parametrlari")}
                    </div>
                    <div className="camera_settings_modal_inputs">
                        <h4 className="settings_modal_input_label" >{t("Kamera nomi")}</h4>
                        <div className="camera_groups_language">
                            <Form.Item
                                label={false}
                                name="name_uz"
                                rules={[
                                    {
                                        required: true,
                                        message: t("Iltimos_guruh_nomini_kiriting!"),
                                    },
                                ]}
                            >
                                <Input
                                    className="settings_modal_select"
                                    placeholder={t('Kiriting')}
                                    prefix={<img src={uzbek} alt="uz"/>}

                                />
                            </Form.Item>

                            <Form.Item
                                label={false}
                                name="name_ru"
                                rules={[
                                    {
                                        required: true,
                                        message: t("Iltimos_guruh_nomini_kiriting!"),
                                    },
                                ]}
                            >
                                <Input
                                    className="settings_modal_select"
                                    placeholder={t('Kiriting')}
                                    prefix={<img src={russia} alt="uz"/>}
                                />
                            </Form.Item>

                            <Form.Item
                                label={false}
                                name="name_en"
                                rules={[
                                    {
                                        required: true,
                                        message: t("Iltimos_guruh_nomini_kiriting!"),
                                    },
                                ]}
                            >
                                <Input
                                    className="settings_modal_select"
                                    placeholder={t('Kiriting')}
                                    prefix={<img src={engliz} alt="uz"/>}
                                />
                            </Form.Item>
                        </div>

                        <Form.Item
                            className="settings_modal_input_label"
                            label={t("Kamera turi")}
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: t('Kamera turini tanlang!'),
                                },
                            ]}
                        >
                            <Select
                                placeholder={t("Tanlash")}
                                className="settings_modal_select"
                                size="large"
                            >
                                <Select.Option value="dahua">{t("Dahua")}</Select.Option>
                                <Select.Option value="hikvision">{t("Hikvision")}</Select.Option>
                                <Select.Option value="boshqalar">{t("Boshqalar")}</Select.Option>
                            </Select>
                        </Form.Item>

                        <div className="setting_input_lebel_groups">
                            <Form.Item
                                className="settings_modal_input_label"
                                label={t("Guruh")}
                                name="group_id"
                                rules={[
                                    {
                                        required: true,
                                        message: t("Guruh turini tanlang!"),
                                    },
                                ]}
                            >
                                <Select
                                    className="settings_modal_select"
                                    size="large"
                                    placeholder={t("Tanlash")}
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
                                label={t("IP manzili")}
                                name="ip_address"
                                rules={[
                                    {
                                        required: true,
                                        message: t("IP manzil kiriting!"),
                                    },
                                ]}
                            >
                                <Input
                                    className="settings_modal_input"
                                    size="large"
                                    placeholder={t("Kiritish")}
                                    style={{borderRadius: '5px'}}
                                />
                            </Form.Item>
                        </div>

                        <div className="setting_input_lebel_groups">
                            <Form.Item
                                className="settings_modal_input_label"
                                label={t("Login")}
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: t("Login kiriting!"),
                                    },
                                ]}
                            >
                                <Input
                                    className="settings_modal_input"
                                    size="large"
                                    placeholder={t("Kiritish")}
                                    style={{borderRadius: '5px'}}
                                />
                            </Form.Item>
                            <Form.Item
                                className="settings_modal_input_label"
                                label={t("Parol")}
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: t("Parol kiriting!"),
                                    },
                                    ]}
                            >
                                <Input
                                    className="settings_modal_input"
                                    size="large"
                                    placeholder={t("Kiritish")}
                                    style={{borderRadius: '5px'}}
                                />
                            </Form.Item>
                        </div>

                        <div className="add_camera_buttons">
                            <button type="button" onClick={cancel} className="add_camera_buttons_cancle">{t("Bekor qilish")}</button>
                            <button type="submit"  className="add_camera_buttons_save">{t("Saqlash")}</button>
                        </div>
                    </div>
                </div>
                </Form>
            </Modal>
        </>
    );
};

export default AddCameraModal;