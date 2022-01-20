import React, { useState } from 'react';
import {Input, Modal, Select,} from 'antd';

import './addIDcard.css';

function AddIDcardModal(props) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const { Option } = Select;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <>
            <div className="realtime_table_buttons">
                <button className="realtime_table_button" >Tahrirlash</button>
                <button className="realtime_table_button" onClick={showModal}>ID karta qo’shish</button>
            </div>

            <Modal  visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
                <p className="add_cardModal_title">ID karta qo’shish</p>

                <Select
                    placeholder="Tanlash"
                    size={"large"}
                    onChange={onChange}
                    style={{ width: '100%' }}
                >

                    <Option value="1">ID1</Option>
                    <Option value="2">ID2</Option>
                    <Option value="3">ID3</Option>
                </Select>

                <Input
                    className="add_cardModal_input"
                    placeholder="Kiriting"
                    type="number"

                />

                <div className="addIDcard_buttons">
                    <button className="cancel_add_btn" onClick={handleCancel} >Bekor qilish</button>
                    <button className="cancel_add_btn" onClick={handleOk} >Saqlash</button>
                </div>

            </Modal>
        </>
    );
}

export default AddIDcardModal;
