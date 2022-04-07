import React, { useEffect, useState } from "react";
import { ip } from "../../../../ip";
import {useTranslation} from "react-i18next";
import { Form } from 'antd';

import Modal from "react-modal";
import axios from "axios";
import './addStaff.css';

import Left from "./Left";
import StaffRight from "./StaffRight";
import StaffMiddle from "./StaffMiddle";
import MiddleBottom from "./MiddleBottom";

Modal.setAppElement("#root");

function AddStaff(props) {

    const {
        isOpenAddStaff,
        setIsOpenAddStaff,
        staffTableIntialValues,
        setStaffPaginationCurrent,
        getStaffData,
    } = props;

    const {t} = useTranslation()
    const [ isOpenAddTerminal, setIsOpenAddTerminal] = useState(false);
    const [ isOpenAddFingerprint,setIsOpenAddFingerprint] = useState(false);
    const [terminalIPList, setTerminalIPList] = useState([]);
    const [card, setCard] = useState([]);
    const [fingerPrint, setFingerPrint] = useState([]);

    const [selectedCards , setSelectedCards] = useState([]);

    // staffTableIntialValues.cards ? setCard(staffTableIntialValues.cards) : setCard([]);
    console.log(card)
    const [data, setData] = useState({
        fullname: '',
        gender: '',
        user_type: '',
        rank: '',
        door_ip: [],
        access_type: '',
        valid_from_time: '',
        valid_to_time: '',
        image: '',
        notification: false,
    })
    const cancel = () =>{
        setIsOpenAddStaff(!setIsOpenAddStaff)

    }
    // console.log("value = ", staffTableIntialValues)

    const onFinish = (value) => {
        const formData = {
            ...value,
            image: data.image,
            notification: data.notification,
        }
        const fd = new FormData();
        Object.keys(formData).forEach(i => fd.append(i, formData[i]));
        fd.append("cards", JSON.stringify(card));
        fd.append("fingerprint", JSON.stringify(fingerPrint));

        if (staffTableIntialValues.edit){
            // console.log("Hello world");
            axios.put(`${ip}/api/terminal/updateuser`, {
                ...value
            })
                .then(response =>{
                    getStaffData(setStaffPaginationCurrent)
                    console.log(response);
                })
                .catch(err=>{
                    console.log(err?.response?.data)
                })
        }
        else {
            axios.post(`${ip}/api/terminal/adduser`, fd)
                .then(res => {
                    setIsOpenAddStaff(false)
                    getStaffData(setStaffPaginationCurrent)
                })
                .catch(err => {
                    console.log(err?.response?.data)
                })
        }

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
            onRequestClose={() => setIsOpenAddStaff(false)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={300}
            // shouldCloseOnOverlayClick={false}
        >
            <Form
                name="basic"
                layout="vertical"
                initialValues={staffTableIntialValues}
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
                                <StaffMiddle staffTableIntialValues={staffTableIntialValues} card={card} setCard={setCard} isOpenAddTerminal={isOpenAddTerminal} setIsOpenAddTerminal = {setIsOpenAddTerminal} />
                            </div>
                            <div className="access_control_add_staff_modal_body_item">
                                <p className="access_control_add_staff_modal_body_item_title">Barmoq izi</p>
                                <MiddleBottom terminalIPList={terminalIPList} fingerPrint={fingerPrint} setFingerPrint={setFingerPrint} isOpenAddFingerprint={isOpenAddFingerprint} setIsOpenAddFingerprint={setIsOpenAddFingerprint} />
                            </div>
                        </div>

                        <div className="access_control_add_staff_modal_body_item">
                            <p className="access_control_add_staff_modal_body_item_title">Yuzni aniqlash</p>
                            <StaffRight data = {data} setData = {setData} terminalIPList = {terminalIPList} />
                          <div className="staff_buttons">
                              <button className="addStaff_cancel_button">Bekor qilish</button>

                              <button className="access_control_add_staff_modal_body_item_3_submit_button" type="submit">
                                  Saqlash
                              </button>
                          </div>
                        </div>
                    </div>
                </div>

            </Form>
        </Modal>
    );
}

export default AddStaff