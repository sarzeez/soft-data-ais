import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Form } from 'antd';
import axios from "axios";

import './addStaff.css'

import Left from "./Left";
import Middle from "./Middle";
import Right from "./Right";

Modal.setAppElement("#root");

function AddStaff(props) {

    const { isOpenAddStaff, setIsOpenAddStaff  } = props;

    const [data, setData] = useState({
        fullname: 'Abdulaziz',
        gender: 'male',
        rank: '1',
        user_type: '1',
        door_ip: [],
        access_type: '1',
        limit: '1',
        valid_from_time: '',
        valid_to_time: '',
        image: '',
        card_id: '22a22a2',
        card_type: 'as',
        notify: '12'

    })

    const onFinish = () => {

    }

    const onFinishFailed = () => {

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
            <Form
                name="basic"
                layout="vertical"
                initialValues={{
                    fullname: data.fullname,
                    gender: data.gender,
                    rank: data.rank,
                    user_type: data.user_type,
                    // door_ip: data.door_ip,
                    access_type: data.access_type,
                    limit: data.limit,
                    valid_from_time: data.valid_from_time,
                    valid_to_time: data.valid_from_time,
                    image: data.valid_to_time,
                    card_id: data.card_id,
                    card_type: data.card_type,
                    notify: data.notify
                }}
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
                                <Right data = {data} setData = {setData} />
                            </div>
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