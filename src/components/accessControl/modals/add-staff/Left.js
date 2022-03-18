import React, { useState } from 'react';
import {Form, Input, Select, Checkbox, DatePicker, TreeSelect, Switch} from 'antd';
import {useTranslation} from "react-i18next";
import './left.css';

const { SHOW_PARENT } = TreeSelect;

const Left = ({ data, setData, terminalIPList }) => {

    const {t} = useTranslation()
    const [state, setState] = useState([])
    const [isChecked, setIsChecked] = useState(false);


    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };
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
                    label={t("Ism")}
                    name="fullname"
                    rules={[
                    {
                        required: true,
                        message: t("Ism kiriting!"),
                    },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder={t("Kiriting")}
                        style={{borderRadius: '5px'}}
                    />
                </Form.Item>
                <Form.Item
                    label={t("Jinsi")}
                    name="gender"
                    rules={[
                    {
                        required: true,
                        message: t("Jinsni tanlang"),
                    },
                    ]}
                >
                    <Select
                        size="large"
                    >
                        <Select.Option value="male">{t("Erkak")}</Select.Option>
                        <Select.Option value="female">{t("Ayol")}</Select.Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="access_control_add_staff_modal_body_item_left_inputs">
                <Form.Item
                    label={t("Toifasi")}
                    name="rank"
                    rules={[
                    {
                        required: true,
                        message: t("Toifasini tanlang"),
                    },
                    ]}
                >
                    <Select
                        size="large"
                    >
                        <Select.Option value="1">{t("Xodim")}</Select.Option>
                        <Select.Option value="2">{t("Mehmon")}</Select.Option>
                        <Select.Option value="3">{t("Begona")}</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={t("Lavozimi")}
                    name="user_type"
                    rules={[
                    {
                        required: true,
                        message: t("Lavozimini tanlang"),
                    },
                    ]}
                >
                    <Select
                        size="large"
                    >
                        <Select.Option value="1">{t("Oddiy xodim")}</Select.Option>
                        <Select.Option value="2">{t("Direktor")}</Select.Option>
                        <Select.Option value="3">{t("VIP")}</Select.Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="access_control_add_staff_modal_body_item_left_input">
                <Form.Item
                    label={t("Ruxsat etilgan eshiklar")}
                    name="door_ip"
                    rules={[
                    {
                        required: true,
                        message: t("Ruxsat etilgan eshikni tanlang"),
                    },
                    ]}
                >
                    <TreeSelect {...tProps} />
                </Form.Item>
            </div>
            <div className="access_control_add_staff_modal_body_item_left_input">
                <Form.Item
                    label={t("Ruxsat turi")}
                    name="access_type"
                    rules={[
                    {
                        required: true,
                        message: t("Ruxsat turini tanlang"),
                    },
                    ]}
                >
                    <Select
                        size="large"
                    >
                        <Select.Option value="0">{t("Yuz")}</Select.Option>
                        <Select.Option value="1">{t("Barmoq izi")}</Select.Option>
                        <Select.Option value="2">{t("Yuz yoki Barmoq izi")}</Select.Option>
                        <Select.Option value="3">{t("Yuz va Barmoq izi")}</Select.Option>
                    </Select>
                </Form.Item>
            </div>

            <div className="access_control_add_staff_modal_body_item_left_inputs">
                <Form.Item
                    label={t("Muddat")}
                    name="valid_from_time"
                    rules={[
                    {
                        required: true,
                        message: t("Muddatni tanlang"),
                    },
                    ]}
                >
                    <DatePicker
                        size="large"
                        style={{borderRadius: '5px'}}
                    />
                </Form.Item>
                <Form.Item
                    label={t("Muddat")}
                    name="valid_to_time"
                    rules={[
                    {
                        required: true,
                        message: t("Muddatni tanlang"),
                    },
                    ]}
                >
                    <DatePicker
                        size="large"
                        style={{borderRadius: '5px'}}
                    />
                </Form.Item>
            </div>

            <div className='access_control_add_staff_modal_body_item_3_notif'>
                <p>Xodimning kirib/chiqish ma’lumotlari haqida bildirishnoma olishni istaysizmi?</p>
                <Switch
                    checkedChildren="Ha"
                    unCheckedChildren="Yo'q"
                    checked={data.notification}
                    onChange={(value) => setData({...data, notification: value})}
                />
            </div>
        </div>
    )
};

export default Left;
