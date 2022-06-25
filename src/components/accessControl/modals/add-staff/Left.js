import React, { useState } from 'react';
import {Form, Input, Select, DatePicker, TreeSelect, Switch} from 'antd';
import {useTranslation} from "react-i18next";
import moment from "moment";
import './left.css';


const { SHOW_PARENT } = TreeSelect;


const Left = ({ data, setData, terminalIPList, staffTableIntialValues }) => {

    const {t} = useTranslation()
    const [state, setState] = useState([]);
    const [userType, setUserType] = useState(staffTableIntialValues?.user_type || 0)

    const categoryData = [
       [
           {value: 1, name: "Oddiy xodim"},
           {value: 2, name: "Direktor"},
           {value: 3, name: "VIP"},
       ],
       [
           {value: 4, name: "Mehmon"},
           {value: 5, name: "Bloklangan"},
       ]
    ]


    const userTypeOnChange = (e) => {
        setUserType(e);
    }

    const onChange = (value) => {
        // console.log(value)
        const list = setState(value);
        setData({...data, door_ip: value})
    };

    const tProps = {
        treeData: terminalIPList,
        value: state,
        onChange: onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        placeholder: t('Tanlash'),
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
                        placeholder={t("Kiriting")}
                    >
                        <Select.Option disabled value="">
                            <span style={{color:"#bfbfbf"}}>{t("Tanlash")}</span>
                        </Select.Option>
                        <Select.Option value="male">{t("Erkak")}</Select.Option>
                        <Select.Option value="female">{t("Ayol")}</Select.Option>
                    </Select>
                </Form.Item>
            </div>
            <div className="access_control_add_staff_modal_body_item_left_inputs">
                <Form.Item
                    label={t("Toifasi")}
                    name="user_type"
                    rules={[
                    {
                        required: true,
                        message: t("Toifasini tanlang"),
                    },
                    ]}
                >
                    <Select
                        size="large"
                        placeholder={"Kiriting"}
                        onChange={userTypeOnChange}
                        value={userType}
                    >
                        <Select.Option disabled value="">
                            <span style={{color:"#bfbfbf"}}>{t("Tanlash")}</span>
                        </Select.Option>
                        <Select.Option value={1}>{t("Xodim")}</Select.Option>
                        <Select.Option value={2}>{t("Begona")}</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={t("Lavozimi")}
                    name="rank"
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
                        <Select.Option disabled value="">
                            <span style={{color:"#bfbfbf"}}>{t("Tanlash")}</span>
                        </Select.Option>
                        {
                            categoryData[userType - 1]?.map((item, index) => (
                                <Select.Option key={index} value={item.value}>{t(item.name)}</Select.Option>
                            ))
                        }
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
                    <TreeSelect  {...tProps}/>
                </Form.Item>

            </div>

            <p className="access_time_label">Ruxsat etiladigan muddat</p>
            <div className="access_control_add_staff_modal_body_item_left_inputs">
                <Form.Item
                    // label={t(" ")}
                    name="valid_from_time"
                    rules={[
                    {
                        required: true,
                        message: t("Muddatni tanlang"),
                    },
                    ]}
                >
                    <DatePicker
                        placeholder={`${moment(new Date()).format(
                            "DD.MM.YYYY"
                        )}`}
                        size="large"
                        style={{borderRadius: '5px'}}
                    />

                </Form.Item>
                <Form.Item
                    // label=" "
                    name="valid_to_time"
                    rules={[
                    {
                        required: true,
                        message: t("Muddatni tanlang"),
                    },
                    ]}
                >
                    <DatePicker
                        placeholder={`${moment(new Date()).format(
                            "DD.MM.YYYY"
                        )}`}
                        size="large"
                        style={{borderRadius: '5px'}}
                    />
                </Form.Item>
            </div>

            <div className='access_control_add_staff_modal_body_item_3_notif'>
                <p>{t("notiftext")}</p>
                <Switch
                    checkedChildren={t("Ha")}
                    unCheckedChildren={t("Yo'q")}
                    checked={data.notification}
                    onChange={(value) => setData({...data, notification: value})}
                />
            </div>
        </div>
    )
};

export default Left;
