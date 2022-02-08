import {Form, Input, Select} from "antd";
import React, {useEffect, useState} from "react";
import {ip} from "../../../../ip";

import Modal from "react-modal";
import axios from "axios";
import '../AddCameraModal/addCameraModal.css';

import russia from "../../../../images/russia.svg";
import uzbek from "../../../../images/uzbek.svg";
import engliz from "../../../../images/engliz.svg";


const EditCameraModal = (props) => {
    const { isOpenEditCamera, setIsOpenEditCamera} = props;


    const [languageGroup, setLanguageGroup] = useState([]);
    const lang = localStorage.getItem('i18nextLng');
    const [cameraSetting, setCameraSetting] = useState([]);

    const [langNameUz, setLangNameUz] = useState('');
    const [langNameRu, setLangNameRu] = useState('');
    const [langNameEn, setLangNameEn] = useState('');
    const [cameraType, setCameraType] = useState();
    const [groupName, setGroupName] = useState();
    const [ipAdress, setIpAdress] = useState();
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();


    const onChangeLangUz = (e) =>{
        setLangNameUz(e.target.value);
    }

    const onChangeLangRu = (e) =>{
        setLangNameRu(e.target.value);
    }

    const onChangeLangEn = (e) =>{
        setLangNameEn(e.target.value);
    }

    const onChangeCameraType = (e)=>{
        setCameraType(e);
    }
    const onChangeGroup = (e)=>{
        setGroupName(e);
    }
    const onChangeIpAdress = (e)=>{
        setIpAdress(e.target.value);
    }
    const onChangeLogin = (e)=>{
        setLogin(e.target.value);
    }
    const onChangePassword = (e)=>{
        setPassword(e.target.value);
    }

    const cancel = () =>{
        setIsOpenEditCamera(!isOpenEditCamera)
    }

    const getCameraAddData = async (id) => {
        await axios.post(`${ip}/api/cameras`, {
            name_uz: langNameUz,
            name_ru: langNameRu,
            name_en: langNameEn,
            type: cameraType,
            group_id: groupName,
            ip_address: ipAdress,
            username: login,
            password: password
        }, )
            .then(response => {
                setLanguageGroup(response && response.data);
            })
            .catch(err => {
                console.log("Error occured");
                // console.log(err)
            })
    }

    const getCameraGroup = async () =>{
        const response = await axios.get(`${ip}/api/camera_group`)
        const { data } = response;
        setCameraSetting(data)
    }


    useEffect(()=>{
        getCameraGroup();
    }, [])

    return (
        <>
            <Modal
                isOpen={isOpenEditCamera}
                onRequestClose={() => setIsOpenEditCamera(false)}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={0}
            >
                <div className="camera_settings_modal_content">
                    <div className="camera_settings_modal_title">
                        Kamera parametrlari
                    </div>
                    <Form>
                        <div className="camera_settings_modal_inputs">
                            <h4 className="settings_modal_input_label" >Kamera nomi</h4>
                            <div className="camera_groups_language">
                                <Input className="camera_language_input" onChange={onChangeLangUz}  placeholder="Kiriting" prefix={<img src={uzbek} alt="uz"/>} />
                                <Input className="camera_language_input" onChange={onChangeLangRu} placeholder="Входить" prefix={<img src={russia} alt="ru"/>} />
                                <Input className="camera_language_input" onChange={onChangeLangEn} placeholder="Enter" prefix={<img src={engliz} alt="eng"/>} />
                            </div>

                            <Form.Item
                                className="settings_modal_input_label"
                                label="Kamera turi"
                                name="camera type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your gender!',
                                    },
                                ]}
                            >
                                <Select
                                    onChange={onChangeCameraType}
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
                                    name="camera_type"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your gender!',
                                        },
                                    ]}
                                >
                                    <Select
                                        onChange={onChangeGroup}
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
                                    name="camera_ip"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input camera name!',
                                        },
                                    ]}
                                >
                                    <Input
                                        onChange={onChangeIpAdress}
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
                                    name="camera_login"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input camera name!',
                                        },
                                    ]}
                                >
                                    <Input
                                        onChange={onChangeLogin}
                                        className="settings_modal_input"
                                        name="camera_login"
                                        size="large"
                                        placeholder="Kiritish"
                                        style={{borderRadius: '5px'}}
                                        autoComplete="off"
                                    />
                                </Form.Item>
                                <Form.Item
                                    className="settings_modal_input_label"
                                    label="Parol"
                                    name="camera_password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!'
                                        },
                                    ]}
                                >
                                    <Input
                                        onChange={onChangePassword}
                                        className="settings_modal_input"
                                        size="large"
                                        name="camera_password"
                                        placeholder="Kiritish"
                                        style={{borderRadius: '5px'}}
                                        autoComplete="off"
                                    />
                                </Form.Item>

                            </div>

                            <div className="add_camera_buttons">
                                <button onClick={cancel} className="add_camera_buttons_cancle">Bekor qilish</button>
                                <button onClick={getCameraAddData} className="add_camera_buttons_save">Saqlash</button>
                            </div>

                        </div>
                    </Form>
                </div>

            </Modal>
        </>
    );
};

export default EditCameraModal;