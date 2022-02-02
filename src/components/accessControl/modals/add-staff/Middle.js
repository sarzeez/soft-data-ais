import React, { useState } from 'react';
import { Select } from 'antd';

import { FiUpload } from 'react-icons/fi'
import { IoImageOutline } from 'react-icons/io5'

import './middle.css'

const Middle = ({ data, setData }) => {

    const [view, setView] = useState(null)
    const [accessDoors, setAccessDoors] = useState('')

    const upload = (e) => {
        if(e.target.files && e.target.files[0]) {
            setView(URL.createObjectURL(e.target.files[0]))
            setData(e.target.files[0])
        } else {
            setView(null)
        }
    }

    const onChangeImageSelect = (a) => {
        console.log(a)
        setAccessDoors(a)
    }

    console.log(data)

    return (
        <div className="access_control_add_staff_modal_body_item_middle">
                <div className="access_control_add_staff_modal_body_item_middle_image">
                    {
                        view
                            ? <img src = {view} alt = 'view'/>
                            : <IoImageOutline size={75} color='#8E8E8E'/>
                    }
                </div>
                <label htmlFor='access_control_staff_image' className='access_control_add_staff_modal_body_item_middle_upload'>
                    <FiUpload size={18} style={{marginRight: '7px'}}/>
                    Rasm yuklash
                    <input onChange={upload} type="file" id="access_control_staff_image" style={{display: 'none'}} />
                </label>
                <div className='access_control_add_staff_modal_body_item_middle_download_wrapper'>
                    <Select
                        size="large"
                        onChange={onChangeImageSelect}
                        placeholder="Tanlash"
                    >
                        <Select.Option value="">Tanlash</Select.Option>

                        {/* {
                            data && data.door_ip.map(item => (
                                <Select.Option value="1">{item}</Select.Option>
                            ))
                        } */}
                    </Select>
                    <button
                        type='button'
                        className='access_control_add_staff_modal_body_item_middle_download'
                        style={{cursor: `${accessDoors === '' ? 'not-allowed' : 'pointer'}`}}
                    >
                        Rasm olish
                    </button>
                </div>
        </div>
    )
};

export default Middle;
