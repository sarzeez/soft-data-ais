import React, {useEffect, useState} from 'react';
import {Form, Input} from "antd";
import uzbek from "../../../../images/uzbek.svg";
import russia from "../../../../images/russia.svg";
import engliz from "../../../../images/engliz.svg";
import axios from "axios";
import {ip} from "../../../../ip";

const AddNewGroup = (props) => {

    const {
        groupIntialValues,
        setGroupInitialValues,
        setShow,
        show,
        getCameraGroup
    } = props;

    const cancel = () =>{
        setShow(!show)
        setGroupInitialValues({
            name_uz: '',
            name_ru: '',
            name_en: '',
        })
    }


    const onFinish = (values) => {
        if(groupIntialValues.edit) {
            axios.put(`${ip}/api/camera_group/${groupIntialValues.id}`, {
                ...values,
            })
                .then(response => {
                    // item edited
                    cancel();
                    getCameraGroup();
                })
                .catch(err => {
                    console.log(err?.response?.data)
                })
        }
        else {
            axios.post(`${ip}/api/camera_group`, values)
                .then(res => {
                    cancel();
                    getCameraGroup();
                })
                .catch(err => {
                    console.log(err?.response?.data)
                })
        }
    }

    const onFinishFailed = (e) => {
        // console.log(e)
    }


    return (
        <div>
            <Form
                name="basic"
                layout="vertical"
                initialValues={groupIntialValues}
                requiredMark = 'optional'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
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
                            <button type="submit" className="camera_groups_button">Saqlash</button>
                            <button type="button" onClick={cancel} className="camera_groups_button_cancle">Bekor qilish</button>
                        </div>
            </Form>
        </div>
    );
};

export default AddNewGroup;