import React, { useState } from 'react';
import { Form, Input, Select, Checkbox, DatePicker, TreeSelect  } from 'antd';

import './left.css'

const { SHOW_PARENT } = TreeSelect;



const Left = ({ data, setData, terminalIPList }) => {

    const [state, setState] = useState([])

    const onChange = value => {
        // console.log('onChange ', value);
        setState(value);
        setData({...data, value})
    };

    const tProps = {
        treeData: terminalIPList,
        value: state,
        onChange: onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: 'Tanlash',
        style: {
          width: '100%',
        },
        size: 'large'
    };

    return (
        <div className="access_control_add_staff_modal_body_item_left">
            <div className="access_control_add_staff_modal_body_item_left_inputs">
                <Form.Item
                    label="F.I.Sh"
                    name="fullname"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Kiriting"
                        style={{borderRadius: '5px'}}
                    />
                </Form.Item>
                <Form.Item
                    label="Jins"
                    name="gender"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your gender!',
                    },
                    ]}
                >
                    <Select
                        size="large"
                    >
                        <Select.Option value="male">Erkak</Select.Option>
                        <Select.Option value="female">Ayol</Select.Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="access_control_add_staff_modal_body_item_left_inputs">
                <Form.Item
                    label="Toifa"
                    name="rank"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Select
                        size="large"
                    >
                        <Select.Option value="1">Oddiy hodim</Select.Option>
                        <Select.Option value="2">VIP</Select.Option>
                        <Select.Option value="3">Direktor</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Lavozim"
                    name="user_type"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Select
                        size="large"
                    >
                        <Select.Option value="1">Normal</Select.Option>
                        <Select.Option value="2">VIP</Select.Option>
                        <Select.Option value="3">Blacklist</Select.Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="access_control_add_staff_modal_body_item_left_input">
                <Form.Item
                    label="Ruxsat etilgan eshiklar"
                    name="door_ip"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <TreeSelect {...tProps} />
                </Form.Item>
            </div>
            <div className="access_control_add_staff_modal_body_item_left_input">
                <Form.Item
                    label="Ruxsat turi"
                    name="access_type"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Select
                        size="large"
                    >
                        <Select.Option value="0">0</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="access_control_add_staff_modal_body_item_left_inputs">
                <Form.Item
                    label="Kirishlar soni"
                    name="limit"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder="Kiriting"
                        style={{borderRadius: '5px'}}
                    />
                </Form.Item>
                <Checkbox
                        className="access_control_add_staff_modal_body_item_left_checkbox"
                    >
                        Cheklov
                </Checkbox>
            </div>
            <div className="access_control_add_staff_modal_body_item_left_inputs">
                <Form.Item
                    label="Muddat"
                    name="valid_from_time"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <DatePicker
                        size="large"
                        showTime
                        style={{borderRadius: '5px'}}
                    />
                </Form.Item>
                <Form.Item
                    label="Muddat"
                    name="valid_to_time"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <DatePicker
                        size="large"
                        showTime
                        style={{borderRadius: '5px'}}
                    />
                </Form.Item>
            </div>
        </div>
    )
};

export default Left;
