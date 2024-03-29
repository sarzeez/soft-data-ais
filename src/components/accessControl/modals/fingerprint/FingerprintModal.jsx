import React, {useState} from 'react';
import {Form, Input, Select, Spin,} from "antd";
import {ip} from "../../../../ip";
import {useTranslation} from "react-i18next";

import Modal from "react-modal";
import finger2 from '../../../../images/finger2.svg';
import axios from "axios";
import {BiCheck} from "react-icons/all";

import './fingerprint.css';

const FingerprintModal = (props) => {

    const {
        isOpenAddFingerprint,
        setIsOpenAddFingerprint,
        terminalIPList,
        fingerPrint,
        setFingerPrint,
    } = props;

    const {t} = useTranslation()
    const [requestedFinger, setRequestedFinger] = useState(null);
    const [accessFinger, setAccessFinger] = useState('');
    const [loading, setLoading] = useState(false)

    const onChangeFingerprint = (a) =>{
        setAccessFinger(a)
    }

    const handleClickFingerprint = () => {
        setLoading(true)
         axios.post(`${ip}/api/terminal/fingerprint/${accessFinger}`)
            .then(res => {
                setLoading(false)
                setRequestedFinger(res.data);
            })
            .catch(err=>{
                setLoading(false)
                // setRequestedFinger(err.response.data)
                console.log(err.response)
            })
    }

    const onFinish = (value) => {
                const { name } = value;
                if(requestedFinger) {
                    setFingerPrint([...fingerPrint, {key: fingerPrint.length + 1, name: name, file_name: requestedFinger}])
                    setIsOpenAddFingerprint(!isOpenAddFingerprint);
                    setRequestedFinger(null);
                }
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }
    const cancel = () =>{
        setIsOpenAddFingerprint(!isOpenAddFingerprint);
    }

    return (
        <Modal
            isOpen={isOpenAddFingerprint}
            onRequestClose={() => setIsOpenAddFingerprint(cancel)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={300}
        >
            <Form
                name="basic"
                layout="vertical"
                initialValues={{
                    remember: true
                }}
                requiredMark = 'optional'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className='access_control_add_staff_terminal_modal'>
                    <h1 className='access_control_add_staff_terminal_modal_title'>{t("Barmoq izi qo’shish")}</h1>
                    <div className='access_control_add_staff_terminal_modal_body'>
                        <Form.Item
                            label={t("Barmoq izi nomi")}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: t('Barmoq izi nomini kiriting'),
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                placeholder={t("Kiriting")}
                            />
                        </Form.Item>
                        <div className="fingerprint_buttonaccess_control_add_staff_fingerprint_bInput">
                            <Form.Item
                                name="terminal_type"
                                rules={[
                                    {
                                        required: true,
                                        message: t('Terminalni tanlang'),
                                    },
                                ]}
                            >
                                <Select
                                    size="large"
                                    value={accessFinger}
                                    onChange={onChangeFingerprint}
                                    placeholder ={t("Terminalni tanlang")}
                                >
                                    {
                                        terminalIPList?.map((item, index) => (
                                            <Select.Option key = {index} value={item.value}>{item.label}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <button
                                type='button'
                                className="fingerprint_button"
                                onClick={handleClickFingerprint}
                            >
                                {
                                    loading ?
                                        <Spin style={{marginRight: 8}}/>
                                        : <img style={{marginRight: 8}} src={finger2} alt=""/>
                                }

                                {t("Barmoq izi olish")}
                            </button>

                        </div>

                        {
                            requestedFinger?
                                <div className="finger_info">
                                    <div className="round">
                                        <BiCheck style={{color: 'white', fontSize: 20}} />
                                    </div>
                                    <h3>Barmoq izi qo’shildi</h3>
                                </div>
                                :
                                ' '
                        }

                        <div className='addFinger_save_button'>
                            <button className="addFinger_button" type='submit'>{t("Saqlash")}</button>
                        </div>
                    </div>
                </div>
            </Form>
        </Modal>
    )
};

export default FingerprintModal;