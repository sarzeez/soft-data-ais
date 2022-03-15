import React, { useEffect, useState } from "react";
import { ip } from "../../../../ip";
import {useTranslation} from "react-i18next";
import { Form, Switch } from 'antd';

import Modal from "react-modal";
import axios from "axios";
import './addStaff.css';

import Left from "./Left";
import StaffRight from "./StaffRight";
import StaffMiddle from "./StaffMiddle";
import AddTerminal from '../add-terminal/AddTerminal'
import MiddleBottom from "./MiddleBottom";
import AddFingerprint from "../fingerprint/AddFingerprint";


Modal.setAppElement("#root");

function AddStaff(props) {

    const { isOpenAddStaff, setIsOpenAddStaff  } = props;

    const {t} = useTranslation()
    const [ isOpenAddTerminal, setIsOpenAddTerminal] = useState(false)
    const [ isOpenAddFingerprint,setIsOpenAddFingerprint] = useState(false)
    const [terminalIPList, setTerminalIPList] = useState([])
    const [initialValues, ] = useState({
        fullname: '',
        gender: '',
        rank: '',
        user_type: '',
        door_ip: [],
        access_type: '',
        valid_from_time: '',
        valid_to_time: '',
        image: '',
        card_id: '',
        card_type: '',
        notify: ''
    })

    const [data, setData] = useState({
        fullname: '',
        gender: '',
        rank: '',
        user_type: '',
        door_ip: [],
        access_type: '',
        valid_from_time: '',
        valid_to_time: '',
        image: '',
        card_id: '',
        card_type: '',
        notify: false
    })

    const onFinish = (value) => {
        const formData = {
            ...value,
            image: data.image,
            notify: data.notify
        }

        const fd = new FormData()
        Object.keys(formData).forEach(i => fd.append(i, formData[i]))

        axios.post(`${ip}/api/terminal/adduser`, fd)
            .then(res => {
                setIsOpenAddStaff(false)
            })
            .catch(err => {
            })
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }

    useEffect(() => {
        const getData = () => {
            axios.get(`${ip}/api/adduser/terminal`)
                .then(res => {
                    const { data } = res;
                    const newData = data.map(item => ({
                        title: item.door_name,
                        value: item.ip_address,
                        key: item.ip_address
                    }))
                    setTerminalIPList(newData)
                })
                .catch(err => {
                })
        }
        getData()
    }, [])

    return (
        <Modal
            isOpen={isOpenAddStaff}
            onRequestClose={() => setIsOpenAddStaff(!isOpenAddStaff)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={300}
        >
            <AddTerminal isOpenAddTerminal={isOpenAddTerminal} setIsOpenAddTerminal={setIsOpenAddTerminal} />
            <AddFingerprint
                isOpenAddFingerprint={isOpenAddFingerprint}
                setIsOpenAddFingerprint={setIsOpenAddFingerprint}
                data = {data} setData = {setData}
            />

            <Form
                name="basic"
                layout="vertical"
                initialValues={initialValues}
                requiredMark = 'optional'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className="access_control_add_staff_modal">
                    <h1 className="access_control_add_staff_modal_title">{t("Yangi foydalanuvchi qo'shish")}</h1>
                    <hr className="access_control_add_staff_modal_subline" />
                    <div className="access_control_add_staff_modal_body">

                        <div className="access_control_add_staff_modal_body_item_1">
                            <div className="access_control_add_staff_modal_body_item">
                                <p className="access_control_add_staff_modal_body_item_title">{t("Ma'lumotlar")}</p>
                                <Left data = {data} setData = {setData} terminalIPList = {terminalIPList} />

                            </div>
                        </div>

                        <div className="access_control_add_staff_modal_body_item_2">
                            <div className="access_control_add_staff_modal_body_item">
                                <p className="access_control_add_staff_modal_body_item_title">ID karta</p>
                                <StaffMiddle data = {data} setData = {setData} setIsOpenAddTerminal = {setIsOpenAddTerminal} />
                            </div>
                            <div className="access_control_add_staff_modal_body_item">
                                <p className="access_control_add_staff_modal_body_item_title">Barmoq izi</p>
                                <MiddleBottom data = {data} setData = {setData} setIsOpenAddFingerprint={setIsOpenAddFingerprint} />
                            </div>
                        </div>

                        <div className="access_control_add_staff_modal_body_item">
                            <p className="access_control_add_staff_modal_body_item_title">Yuzni aniqlash</p>
                            <StaffRight data = {data} setData = {setData} terminalIPList = {terminalIPList} />
                            <button className="access_control_add_staff_modal_body_item_3_submit_button" type="submit">
                                Saqlash
                            </button>
                        </div>
                    </div>
                </div>

            </Form>
        </Modal>
    );
}

export default AddStaff