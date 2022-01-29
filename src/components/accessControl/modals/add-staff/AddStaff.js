import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Form, Switch } from 'antd';
import axios from "axios";

import './addStaff.css'

import Left from "./Left";
import Middle from "./Middle";
import Right from "./Right";
import AddTerminal from '../add-terminal/AddTerminal'

Modal.setAppElement("#root");

function AddStaff(props) {

    const { isOpenAddStaff, setIsOpenAddStaff  } = props;

    const [ isOpenAddTerminal, setIsOpenAddTerminal] = useState(false)
    const [initialValues, setInitialValues] = useState({
        fullname: 'Abdulaziz',
        gender: 'male',
        rank: '12',
        user_type: '12',
        door_ip: [],
        access_type: '12',
        limit: '12',
        valid_from_time: '',
        valid_to_time: '',
        image: '',
        card_id: '22a22a2',
        card_type: 'as',
        notify: '12'
    })

    const [data, setData] = useState({
        fullname: 'Abdulaziz',
        gender: 'male',
        rank: '12',
        user_type: '12',
        door_ip: [],
        access_type: '12',
        limit: '12',
        valid_from_time: '',
        valid_to_time: '',
        image: '',
        card_id: '22a22a2',
        card_type: 'as',
        notify: '12'

    })

    const onFinish = (value) => {
        console.log(value)
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }

    useEffect(() => {
        const getData = () => {
            axios.get(`http://10.100.1.246:5005/api/adduser/terminal`)
                .then(res => {
                    const { data } = res;
                    const newData = data.map(item => ({
                        title: item.door_name,
                        value: item.ip_address,
                        key: item.ip_address
                    }))
                    setData({...data, door_ip: newData})
                })
                .catch(err => {
                    //
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
        >
            <AddTerminal isOpenAddTerminal={isOpenAddTerminal} setIsOpenAddTerminal={setIsOpenAddTerminal} />
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
                    <h1 className="access_control_add_staff_modal_title">Foydalanuvchi ma’lumotlarini tahrirlash</h1>
                    <hr className="access_control_add_staff_modal_subline" />
                    <div className="access_control_add_staff_modal_body">
                        <div className="access_control_add_staff_modal_body_item">
                            <p className="access_control_add_staff_modal_body_item_title">Ma'lumotlar</p>
                            <Left data = {data} setData = {setData} />
                        </div>
                        <div className="access_control_add_staff_modal_body_item">
                            <p className="access_control_add_staff_modal_body_item_title">Yuzni aniqlash</p>
                            <Middle data = {data} setData = {setData} />
                        </div>
                        <div className="access_control_add_staff_modal_body_item_3">
                            <div className="access_control_add_staff_modal_body_item">
                                <p className="access_control_add_staff_modal_body_item_title">ID karta</p>
                                <Right data = {data} setData = {setData} setIsOpenAddTerminal = {setIsOpenAddTerminal} />
                            </div>
                            <div className='access_control_add_staff_modal_body_item_3_notif'>
                                <p>Xodimning kirib/chiqish ma’lumotlari haqida bildirishnoma olishni istaysizmi?</p>
                                <Switch checkedChildren="Ha" unCheckedChildren="Yo'q" />
                            </div>
                            <div /> {/* single div */}
                            <button className="access_control_add_staff_modal_body_item_3_submit_button"
                            type="submit"
                            >Saqlash</button>
                        </div>
                        
                    </div>
                </div>

            </Form>
        </Modal>
    );
}

export default AddStaff