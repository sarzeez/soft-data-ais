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
import moment from "moment";

Modal.setAppElement("#root");

function AddStaff(props) {

    const {
        isOpenAddStaff,
        setIsOpenAddStaff,
        staffTableIntialValues,
        setStaffTableIntialValues,
        staffPaginationCurrent,
        getStaffData,
        selectedCard,
        setSelectedCard,
        card,
        setCard,
        fingerPrint,
        setFingerPrint,
    } = props;

    const {t} = useTranslation()
    const [ isOpenAddTerminal, setIsOpenAddTerminal] = useState(false);
    const [ isOpenAddFingerprint,setIsOpenAddFingerprint] = useState(false);
    const [terminalIPList, setTerminalIPList] = useState([]);
    const [imageState, setImageState] = useState({
        initial: true,
        uploaded: false,
        requested: false,
    })
    // const [card, setCard] = useState([]);
    // const [fingerPrint, setFingerPrint] = useState([]);


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
    const cancel = () => {
        setIsOpenAddStaff(!setIsOpenAddStaff)
        setStaffTableIntialValues({
            id: '',
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
            edit: false,
        })
    }

    const onFinish = (value) => {
        console.log(value)
        const formData = {
            ...value,
            image: data.image,
            notification: data.notification,
            id: data.id,
            door_ip: JSON.stringify(value.door_ip.map(item => item.value || item)),
            valid_to_time: moment(value?.valid_to_time).format("YYYY-MM-DD"),
            valid_from_time: moment(value?.valid_from_time).format("YYYY-MM-DD"),
            fingerprint:  JSON.stringify(fingerPrint),
            cards: JSON.stringify(card)
        }
        const fd = new FormData();
        Object.keys(formData).forEach(i => fd.append(i, formData[i]));

        if (staffTableIntialValues.edit){
            axios.put(`${ip}/api/terminal/updateuser/${staffTableIntialValues.id}`, fd)
                .then(response =>{
                    cancel()
                    getStaffData(staffPaginationCurrent)
                    setSelectedCard([]);
                    setCard([]);
                    setImageState({
                        initial: true,
                        uploaded: false,
                        requested: false
                    })
                })
                .catch(err=>{
                    console.log(err?.response?.data)
                })
        }
        else {
            axios.post(`${ip}/api/terminal/adduser`, fd)
                .then(res => {
                    console.log(res)
                    cancel()
                    getStaffData(staffPaginationCurrent)
                })
                .catch(err => {
                    console.log(err?.response?.data)
                })
        }

    }

    //https://prettier.io/

    const onFinishFailed = (error) => {
        console.log(error)
    }

    useEffect(() => {
        const getData = () => {
            axios.get(`${ip}/api/adduser/terminal`)
                .then(res => {
                    const { data } = res;
                    // console.log("tree",   data)
                    const newData = data.map(item => ({
                        label: item.door_name,
                        value: item.ip_address,
                        key: item.ip_address,
                    }))
                    setTerminalIPList(newData)
                })
                .catch(err => {
                    console.log(err?.response?.data)
                })
        }
        getData();

    }, [])

    return (
        <Modal
            isOpen={isOpenAddStaff}
            onRequestClose={() => setIsOpenAddStaff(false)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={300}
            shouldCloseOnOverlayClick={false}
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
                                <Left
                                    data = {data}
                                    setData = {setData}
                                    terminalIPList = {terminalIPList}
                                />

                            </div>
                        </div>

                        <div className="access_control_add_staff_modal_body_item_2">
                            <div className="access_control_add_staff_modal_body_item">
                                <p className="access_control_add_staff_modal_body_item_title">ID karta</p>
                                <StaffMiddle
                                    staffTableIntialValues={staffTableIntialValues}
                                    card={card}
                                    setCard={setCard}
                                    isOpenAddTerminal={isOpenAddTerminal}
                                    setIsOpenAddTerminal={setIsOpenAddTerminal}
                                    selectedCard={selectedCard}
                                    setSelectedCard={setSelectedCard}
                                />
                            </div>
                            <div className="access_control_add_staff_modal_body_item">
                                <p className="access_control_add_staff_modal_body_item_title">Barmoq izi</p>
                                <MiddleBottom
                                    terminalIPList={terminalIPList}
                                    fingerPrint={fingerPrint}
                                    setFingerPrint={setFingerPrint}
                                    isOpenAddFingerprint={isOpenAddFingerprint}
                                    setIsOpenAddFingerprint={setIsOpenAddFingerprint}
                                    staffTableIntialValues={staffTableIntialValues}
                                />
                            </div>
                        </div>

                        <div className="access_control_add_staff_modal_body_item">
                            <p className="access_control_add_staff_modal_body_item_title">Yuzni aniqlash</p>
                            <StaffRight
                                staffTableIntialValues={staffTableIntialValues}
                                data = {data}
                                setData = {setData}
                                terminalIPList = {terminalIPList}
                                imageState={imageState}
                                setImageState={setImageState}
                            />
                          <div className="staff_buttons">
                              <button type="button" onClick={cancel} className="addStaff_cancel_button">Bekor qilish</button>
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