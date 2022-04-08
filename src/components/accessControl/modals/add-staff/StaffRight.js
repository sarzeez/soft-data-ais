import React, { useState } from 'react';
import { Select } from 'antd';
import { ip } from '../../../../ip';

import axios from 'axios';

import { FiUpload } from 'react-icons/fi';
import { IoImageOutline } from 'react-icons/io5';
import loadingGif from '../../../../assets/gif/loading.gif';

import './staffRight.css';

const StaffRight = ({ data, setData, terminalIPList, staffTableIntialValues }) => {

    const [view, setView] = useState(null)
    const [requestedImage, setRequestedImage] = useState(null)
    const [accessDoors, setAccessDoors] = useState('')
    const [loading, setLoading] = useState(false)

    const upload = (e) => {
        setAccessDoors('')

        if(e.target.files && e.target.files[0]) {
            setView(URL.createObjectURL(e.target.files[0]))
            setData({...data, image: e.target.files[0]})
        } else {
            setView(null)
        }
    }
    const onChangeImageSelect = (a) => {
        setAccessDoors(a)
    }

    if(staffTableIntialValues.edit) {

    }

    const handleClickImageDownload = () => {
        setLoading(true)
        axios.post(`${ip}/api/terminal/capture/${accessDoors}`)
            .then(res => {
                setLoading(false)
                setRequestedImage(res.data)
                setData({...data, image: res.data})
            })
            .catch(err => {
                //
                setLoading(false)
            })
    }
    console.log(staffTableIntialValues.edit);
    return (
        <div className="access_control_add_staff_modal_body_item_middle">
                <div className="access_control_add_staff_modal_body_item_middle_image">
                    {   staffTableIntialValues.edit ?
                        <img src={`${ip}/${staffTableIntialValues.image}`} alt='edit'/>
                        :
                        loading
                            ? <img src={loadingGif} alt='loading'/>
                            : (
                                (view || requestedImage)
                                ? <img src = {view || `${ip}/sign_up_request/${requestedImage}`} alt = 'view'/>
                                : <IoImageOutline size={75} color='#8E8E8E'/>
                            )
                    }
                </div>
                <label htmlFor='access_control_staff_image' className='access_control_add_staff_modal_body_item_middle_upload'>
                    <FiUpload size={18} style={{marginRight: '7px'}}/>
                    Rasm yuklash
                    <input onChange={upload} name='image' type="file" id="access_control_staff_image" style={{display: 'none'}} />
                </label>
                <div className='access_control_add_staff_modal_body_item_middle_download_wrapper'>
                    <Select
                        size="large"
                        value={accessDoors}
                        onChange={onChangeImageSelect}
                        placeholder="Tanlash"
                    >
                        <Select.Option value="">Tanlash</Select.Option>
                        {
                            terminalIPList.map((item, index) => (
                                <Select.Option key = {index} value={item.value}>{item.title}</Select.Option>
                            ))
                        }
                    </Select>
                    <button
                        type='button'
                        className='access_control_add_staff_modal_body_item_middle_download'
                        style={{cursor: `${accessDoors === '' ? 'not-allowed' : 'pointer'}`,
                            color: `${accessDoors === '' ? '#000':'#fff'}`,
                            backgroundColor: `${accessDoors === '' ? '#bebebe':'#29B85D'}`
                    }}
                        onClick={handleClickImageDownload}
                        disabled={accessDoors === '' ? true : false}
                    >
                        Rasm olish
                    </button>
                </div>
        </div>
    )
};

export default StaffRight;
