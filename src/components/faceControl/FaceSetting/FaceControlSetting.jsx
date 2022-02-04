import React, {useEffect, useState} from 'react';
import './faceSetting.css';
import {useSelector} from "react-redux";
import {MdAdd, MdOutlineAddCircleOutline} from "react-icons/md";
import {Input, Tabs} from "antd";
import {AiOutlineDelete} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import {ip} from "../../../ip";

import CameraTable from "./table/CameraTable";
import CameraPagenation from "./pagenation/CameraPagenation";
import AddCameraModal from "./AddCameraModal/AddCameraModal";

import axios from "axios";

import uzbek from '../../../images/uzbek.svg';
import russia from '../../../images/russia.svg';
import engliz from '../../../images/engliz.svg';



const { TabPane } = Tabs;

const FaceControlSetting = () => {

    const navigate = useNavigate()
    const isDarkMode = useSelector(state => state.theme.theme_data)
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)

    // add camera modal state
    const [isOpenAddCamera, setIsOpenAddCamera] = useState(false)

    const [cameraPaginationLimit, setCameraPaginationLimit] = useState(10);
    const [cameraPaginationCurrent, setCameraPaginationCurrent] = useState(1);
    const [cameraData, setCameraData] = useState([]);
    const [cameraTotal, setCameraTotal] = useState(null);
    const [show, setShow] = useState(false);
    const [languageGroup, setLanguageGroup] = useState([]);
    const lang = localStorage.getItem('i18nextLng');
    const [multipelLanguageGroup, setMultipleLanguageGroup] = useState({
        name_uz: '',
        name_ru: '',
        name_en: ''
    })

    const addCamera = () => {
        setIsOpenAddCamera(true)
    }

    const onChangeTabs = (key) => {
        // console.log(key);
    }

    const getCameraData = async (id) => {
        const response = await axios.get(`${ip}/api/cameras/${cameraPaginationLimit}/${id}/${lang}`)

        const { data } = response;
        const count = data && data.count;
        setCameraTotal(count)
        const newData = data && data.data && data.data.map((item, index) => (
            {
                ...item,
                key: index + 1 + (data.current_page - 1) * cameraPaginationLimit,
                name: item.name,
                type: item.type,
                group_name: item.group_name,
                ip_address: item.ip_address,
                username: item.username,
                password: item.password,
            }
        ))
        setCameraData(newData)
    }

    const getCameraGroup = async () =>{
        const response = await axios.get(`${ip}/api/camera_group/${lang}`)
        const { data } = response;
        setLanguageGroup(data)
    }

    const handleClickSaveGroup = () => {
         axios.post(`${ip}/api/camera_group`, multipelLanguageGroup)
            .then(res => {
                setShow(false)
                getCameraGroup()
            })
             .catch(err=>{
                 //
             })

    }

    const handleDeleteGroupItem = async (id) => {
        axios.delete(`${ip}/api/camera_group/${id}`)
            .then(res => {
                getCameraGroup()
            })
            .catch(err=>{
                //
            })
    }

    const cameraPaginationOnChange = (e = 1, option) => {
        getCameraData(e)
        setCameraPaginationCurrent(e)
        setCameraPaginationLimit(option)
    }


    useEffect(() =>{
        getCameraData(cameraPaginationCurrent)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cameraPaginationLimit, cameraPaginationCurrent])

    useEffect(() => {
        getCameraGroup()
        if(!is_refresh_value) {
            navigate('/face-control-search')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="face_control_setting">
            <div className='face_control_setting_header'>
                <div className="face_content_top">
                    <p className= {`Content_title ${isDarkMode && 'darkModeColor'}`} >Yuzni aniqlash sozlamalar</p>
                </div>
            </div>

            <div className="face_control_setting_body">
                <Tabs onChange={onChangeTabs} type="card" defaultActiveKey="1">
                    <TabPane tab="Autentifikatsiya sozlamalari" key="1">
                        <div className='access_control_setting_tab_item access_control_setting_tab_item_single'>
                            <div className='access_control_setting_tab_item_body'>
                                Autentifikatsiya sozlamalari
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab="Kamera parametrlari" key="2">
                        <div className="face_control_setting_tab">
                            <div className='face_control_setting_tab_item'>
                                <AddCameraModal
                                    isOpenAddCamera={isOpenAddCamera}
                                    setIsOpenAddCamera={setIsOpenAddCamera}
                                />
                                <div className='face_control_setting_tab_item_body'>
                                    <div className="camera_table_group">
                                        <CameraTable
                                            isDarkMode={isDarkMode}
                                            cameraData = {cameraData}
                                            handleDeleteGroupItem={handleDeleteGroupItem}
                                        />
                                    </div>
                                </div>

                                <div className='face_control_setting_tab_item_footer'>
                                    <button onClick={addCamera} className='face_control_setting_button'>
                                        <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>
                                        Kamera qo‘shish
                                    </button>
                                    <CameraPagenation
                                        faceTablePaginationLimit = {cameraPaginationLimit}
                                        faceTablePaginationCurrent = {cameraPaginationCurrent}
                                        faceTablePaginationOnChange = {cameraPaginationOnChange}
                                        faceTableTotal = {cameraTotal}
                                    />
                                </div>
                            </div>

                            <div className="camera_groups">
                                        <div style={{maxHeight: '500px', overflow: "auto"}}>
                                            <div className="camera_groups_item">
                                                <h4>Guruhlar</h4>
                                            </div>
                                            {
                                                languageGroup.map((item, index) => (
                                                    <div key={index} className="camera_groups_item">
                                                        <h4>
                                                            {
                                                                lang === 'uz' ? item.name_uz : (lang === 'ru' ? item.name_ru : item.name_en)
                                                            }
                                                        </h4>
                                                        <button onClick={() => handleDeleteGroupItem(item.id)} style={{marginRight: '10px'}} className="camera_groups_item_button"><AiOutlineDelete style={{fontSize: '20px'}} /></button>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                {
                                    !show ?
                                        <div className="add_new_group">
                                            <button onClick={() =>setShow(true)} className="camera_groups_button">
                                                <MdAdd />
                                                Yangi guruh qo’shish
                                            </button>
                                        </div>
                                        :
                                        <div className="camera_groups_language">
                                            <Input className="camera_language_input" value={multipelLanguageGroup.name_uz} onChange={e => setMultipleLanguageGroup({...multipelLanguageGroup, name_uz: e.target.value})} placeholder="Kiriting" prefix={<img src={uzbek} alt="uz"/>} />
                                            <Input className="camera_language_input" value={multipelLanguageGroup.name_ru} onChange={e => setMultipleLanguageGroup({...multipelLanguageGroup, name_ru: e.target.value})} placeholder="Входить" prefix={<img src={russia} alt="ru"/>} />
                                            <Input className="camera_language_input" value={multipelLanguageGroup.name_en} onChange={e => setMultipleLanguageGroup({...multipelLanguageGroup, name_en: e.target.value})} placeholder="Enter" prefix={<img src={engliz} alt="eng"/>} />
                                            <button onClick={handleClickSaveGroup} className="camera_groups_button">Saqlash</button>
                                        </div>
                                }


                            </div>

                        </div>

                    </TabPane>

                    <TabPane tab="Statistika sozlamalari" key="3">
                        <div className='access_control_setting_tab_item access_control_setting_tab_item_single'>
                            <div className='access_control_setting_tab_item_body'>
                                Content of Tab Pane 3
                            </div>
                        </div>
                    </TabPane>

                </Tabs>
            </div>
        </div>
    );
};

export default FaceControlSetting;