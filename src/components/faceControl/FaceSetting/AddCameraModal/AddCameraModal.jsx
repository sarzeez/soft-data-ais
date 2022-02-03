
import Modal from "react-modal";
import './addCameraModal.css';
import {Form, Input, Select, Space} from "antd";
import React from "react";
import {UserOutlined} from "@ant-design/icons";
import russia from "../../../../images/russia.svg";



const AddCameraModal = (props) => {

    const { isOpenAddCamera, setIsOpenAddCamera} = props;

    return (
        <>
            <Modal
                isOpen={isOpenAddCamera}
                onRequestClose={() => setIsOpenAddCamera(false)}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={300}
            >
                <div className="camera_settings_modal_content">
                    <div className="camera_settings_modal_title">
                        Kamera parametrlari
                    </div>
                    <Form>
                        <div className="camera_settings_modal_inputs">
                            <Form.Item
                                className="settings_modal_input_label"
                                label="Kamera nomi"
                                name="camera_name"
                                rules={[
                                    {
                                        // required: true,
                                        message: 'Please input camera name!',
                                    },
                                ]}
                            >
                                <Input
                                    className="settings_modal_input"
                                    prefix={<img src={russia} />}
                                    size="large"
                                    placeholder="Kamera nomini kiriting"
                                    style={{borderRadius: '5px'}}
                                />
                            </Form.Item>

                            <Form.Item
                                className="settings_modal_input_label"
                                label="Kamera turi"
                                name="camera type"
                                rules={[
                                    {
                                        // required: true,
                                        message: 'Please input your gender!',
                                    },
                                ]}
                            >
                                <Select
                                    className="settings_modal_select"
                                    size="large"
                                    placeholder="Tanlash"
                                >
                                    <Select.Option value="camera1">camera1</Select.Option>
                                    <Select.Option value="camera2">camera2</Select.Option>
                                </Select>
                            </Form.Item>

                            <div className="setting_input_lebel_groups">
                                <Form.Item
                                    className="settings_modal_input_label"
                                    label="Guruh"
                                    name="camera type"
                                    rules={[
                                        {
                                            // required: true,
                                            message: 'Please input your gender!',
                                        },
                                    ]}
                                >
                                    <Select
                                        className="settings_modal_select"
                                        size="large"
                                        placeholder="Tanlash"
                                    >
                                        <Select.Option value="camera1">camera1</Select.Option>
                                        <Select.Option value="camera2">camera2</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="settings_modal_input_label"
                                    label="IP manzili"
                                    name="camera_ip"
                                    rules={[
                                        {
                                            // required: true,
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
                                    name="login"
                                    rules={[
                                        {
                                            // required: true,
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

                            <div className="add_camera_buttons">
                                <button className="add_camera_buttons_cancle">Bekor qilish</button>
                                <button className="add_camera_buttons_save">Saqlash</button>
                            </div>

                        </div>
                    </Form>
                </div>

            </Modal>
        </>
    );
};

export default AddCameraModal;