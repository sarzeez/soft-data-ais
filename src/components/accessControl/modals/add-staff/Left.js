import React, { useState } from 'react';
import { Form, Input, Select, Checkbox, DatePicker, TreeSelect  } from 'antd';

import './left.css'

const { SHOW_PARENT } = TreeSelect;



const Left = ({ data, setData }) => {

    const [state, setState] = useState([])

    const onChange = value => {
        // console.log('onChange ', value);
        setState(value);
    };

    const tProps = {
        treeData: data.door_ip,
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
                    label="Ism"
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
                        <Select.Option value="all">Erkak</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
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
                        <Select.Option value="all">Mijoz</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
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
                        <Select.Option value="all">Ishchi</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
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
                        <Select.Option value="all" hidden>Tanlash</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                        <Select.Option value="3">3</Select.Option>
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
                    />
                </Form.Item>
                <Checkbox
                        // onChange={onChange}
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
                    />
                </Form.Item>
            </div>
        </div>
    )
};

export default Left;