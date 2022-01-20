import React, { useState} from "react";
import Modal from "react-modal";
import { Form, Input, DatePicker, Button, Row, Col } from 'antd';
import { FiCamera } from "react-icons/fi";

import './newStaff.css';
import axios from "axios";

Modal.setAppElement("#root");

export default function AddModal({ newStaffModal, setNewStaffModal }) {

    const [viewImage, setViewImage] = useState(false)
    const [image, setImage] = useState(null)
    const [imageFailed, setImageFailed] = useState(false)
    const [initialValues, setInitialValues] = useState({
        id: '123',
        fullname: '',
        accessed_door: '',
        from_date: '',
        to_date: '',
    })

    const onFinish = (values) => {
        if(image) {
            const newFormData = {...values, image}
            const fd = new FormData()
            Object.keys(newFormData).forEach(i => fd.append(i, newFormData[i]))
            console.log(fd)
            axios.post(`http://10.100.1.246:5005/api/workers`, fd)
                .then(res => {
                    console.log(res)
                    setImageFailed(false)
                    setNewStaffModal(false)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            console.log('image failed...')
            setImageFailed(true)
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleUpdoadFileImage = e => {
        if(e.target.files && e.target.files[0]) {
            setViewImage(URL.createObjectURL(e.target.files[0]))
            setImage(e.target.files[0])
            setImageFailed(false)
        }
        else {
            setViewImage(false)
        }
    }

    return (
        <Modal
            isOpen={newStaffModal}
            onRequestClose={() => setNewStaffModal(false)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={300}
        >
            <div className = "modal_form" style={{width: '600px'}}>
            <h1 className = "modal_title" style={{marginBottom: '10px'}}>Xodim qo`shish</h1>
            <Form
                name="basic"
                layout="vertical"
                initialValues={{
                    remember: true,
                }}
                requiredMark = 'optional'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row>
                    <Col span={17} style={{padding: '0 10px'}}>
                        <Form.Item
                            label="ID"
                            name="id"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <Input
                                value={initialValues.id}
                                onChange={value => setInitialValues({...initialValues, id: value})}
                                size="large"
                                style={{borderRadius: '5px'}}
                                placeholder="ID raqamni kiriting"
                            />
                        </Form.Item>
                        <Form.Item
                            label="F.I.SH"
                            name="fullname"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <Input
                                value={initialValues.fullname}
                                onChange={value => setInitialValues({...initialValues, fullname: value})}
                                size="large"
                                style={{borderRadius: '5px'}}
                                placeholder="Ism, familiya, sharif" />
                        </Form.Item>
                        <Form.Item
                            label="Ruxsat etilgan eshik"
                            name="accessed_door"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <Input value={initialValues.accessed_door} onChange={value => setInitialValues({...initialValues, accessed_door: value})} size="large" style={{borderRadius: '5px'}} placeholder="Tanlash" />
                        </Form.Item>
                    </Col>
                    <Col span={7} style={{ padding: '30px 10px 10px'}}>
                        <label htmlFor="staff-file">
                            <div style={{borderColor: `${imageFailed ? 'red' : ''}`, boxShadow: `${imageFailed ? '0 0 0 2px rgba(255, 0, 0, 0.2)' : ''}`}} className = 'label-container'>
                                {
                                    !viewImage
                                    ?   <>
                                            <FiCamera color="#C1C1C1" size={40} />
                                            <p className="label-container-text">100 kb oshmasligi shart</p>
                                        </>
                                    : <img src={viewImage} alt = 'asdf' />
                                }
                            </div>
                        </label>
                        <input name="image" id='staff-file' onChange={handleUpdoadFileImage} type="file" style={{display: 'none'}} />
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={{ padding: '0 10px' }}>
                        <Form.Item
                            label="Dan"
                            name="from_date"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <DatePicker value={initialValues.from_date} onChange={value => setInitialValues({...initialValues, from_date: value})} size="large" style={{width: '100%', borderRadius: '5px'}} placeholder="00.00.0000"/>
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{ padding: '0 10px' }}>
                        <Form.Item
                            label="Gacha"
                            name="to_date"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                            <DatePicker value={initialValues.to_date} onChange={value => setInitialValues({...initialValues, to_date: value})} size="large" style={{width: '100%', borderRadius: '5px'}} placeholder="00.00.0000"/>
                        </Form.Item>
                    </Col>
                </Row> 
                <Row style={{marginTop: '10px'}}>
                    <Col span={12} style={{ padding: '0 10px', textAlign: 'right'}}>
                        <Form.Item>
                            <Button size="large" type="primary" htmlType="submit" style={{backgroundColor: '#29B85D', borderColor: '#29B85D', borderRadius: '5px'}}>
                                Saqlash
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={12} style={{ padding: '0 10px'}} >
                        <Form.Item>
                            <Button onClick={() => setNewStaffModal(false)} size="large" type="default" style={{borderColor: '#C1C1C1', color: '#C1C1C1', borderRadius: '5px'}}>
                                Bekor qilish
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            </div>
        </Modal>
    );
}