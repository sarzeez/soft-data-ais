import React, {useEffect, useState} from 'react';
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
import './faceSetting.css';

import uzbek from '../../../images/uzbek.svg';
import russia from '../../../images/russia.svg';
import engliz from '../../../images/engliz.svg';
import AddNewGroupTable from "./AddNewGroup/AddNewGroupTable";

const { TabPane } = Tabs;

const FaceControlSetting = () => {

    const navigate = useNavigate()
    const isDarkMode = useSelector(state => state.theme.theme_data)
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)

    // add camera modal state
    const [isOpenAddCamera, setIsOpenAddCamera] = useState(false);

    // camera initial values
    const [cameraIntialValues, setCameraInitialValues] = useState({
        name_uz: '',
        name_ru: '',
        name_en: '',
        type: '',
        group_id: '',
        ip_address: '',
        username: '',
        password: ''
    })

    // group initial values
    const [groupIntialValues, setGroupInitialValues] = useState({
        name_uz: '',
        name_ru: '',
        name_en: '',
    })

    // delete button
    const [deleteCamera, setDeleteCamera] = useState([])

    const [deleteGroup, setDeleteGroup] = useState([])



    const [cameraPaginationLimit, setCameraPaginationLimit] = useState(14);
    const [cameraPaginationCurrent, setCameraPaginationCurrent] = useState(1);
    const [cameraTotal, setCameraTotal] = useState(null);
    const [show, setShow] = useState(false);
    const [languageGroup, setLanguageGroup] = useState([]);
    const lang = localStorage.getItem('i18nextLng');
    const [multipelLanguageGroup, setMultipleLanguageGroup] = useState({
        name_uz: '',
        name_ru: '',
        name_en: ''
    })

    const [cameraData, setCameraData] = useState([]);
    // console.log(cameraData)

    const addCamera = () => {
        setIsOpenAddCamera(true)
    }

      const getCameraData = async (id) => {
        // const response = await axios.get(`${ip}/api/cameras/${cameraPaginationLimit}/${id}/${lang}`)
        const response = await axios.get(`${ip}/api/cameras/${cameraPaginationLimit}/${id}`)

        const { data } = response;
        const count = data && data.count;
        setCameraTotal(count)
        const newData = data && data.data && data.data.map((item, index) => (
            {
                ...item,
                key: index + 1 + (data.current_page - 1) * cameraPaginationLimit,
                name_uz: item.name_uz,
                name_ru: item.name_ru,
                name_en: item.name_en,
                type: item.type,
                group_name_uz: item.group_name_uz,
                group_name_ru: item.group_name_ru,
                group_name_en: item.group_name_en,
                ip_address: item.ip_address,
                username: item.username,
                password: item.password,
            }
        ))
        setCameraData(newData)
    }

    const handleDeleteCamera = () => {
        axios.delete(`${ip}/api/camera/delete`,{data: deleteCamera})
            .then(res =>{
                getCameraData(cameraPaginationCurrent);
            })
            .catch(err => {
                // console.log(err?.response?.data)
            })
    }

    const onChangeTabs = (key) => {
        // console.log(key);
    }


    const getCameraGroup = async (id) =>{
        const response = await axios.get(`${ip}/api/camera_group`)
        const { data } = response;
        setLanguageGroup(data);
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
                                    cameraPaginationLimit={cameraPaginationLimit}
                                    cameraIntialValues = {cameraIntialValues}
                                    setCameraInitialValues = {setCameraInitialValues}
                                    getCameraData={getCameraData}
                                    cameraPaginationCurrent={cameraPaginationCurrent}
                                />

                                <div className='face_control_setting_tab_item_body'>
                                    <div className="camera_table_group">
                                        <CameraTable
                                            isDarkMode={isDarkMode}
                                            cameraData = {cameraData}
                                            setDeleteCamera={setDeleteCamera}
                                            isOpenAddCamera={isOpenAddCamera}
                                            setIsOpenAddCamera={setIsOpenAddCamera}
                                            setCameraInitialValues = {setCameraInitialValues}
                                        />
                                    </div>
                                </div>

                                <div className='face_control_setting_tab_item_footer'>
                                    <div className="face_control_setting_tab_item_footer_buttons">
                                        <button onClick={addCamera} className='face_control_setting_button'>
                                            <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>
                                            Kamera qo‘shish
                                        </button>
                                        {
                                            deleteCamera.length > 0 &&
                                            <button onClick={handleDeleteCamera}   className="face_control_setting_footer_delite_button">
                                                <AiOutlineDelete size={22}/>
                                                O’chirish
                                            </button>
                                        }
                                    </div>
                                    <CameraPagenation
                                        faceTablePaginationLimit = {cameraPaginationLimit}
                                        faceTablePaginationCurrent = {cameraPaginationCurrent}
                                        faceTablePaginationOnChange = {cameraPaginationOnChange}
                                        faceTableTotal = {cameraTotal}
                                    />
                                </div>
                            </div>

                            <div className="camera_groups">
                                <AddNewGroupTable
                                    languageGroup={languageGroup}
                                    isDarkMode={isDarkMode}
                                    setDeleteGroup={setDeleteGroup}
                                    setGroupInitialValues = {setGroupInitialValues}
                                    setShow={setShow}
                                />


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
                                            <button  onClick={() =>setShow(false)} className="camera_groups_button_cancle">Bekor qilish</button>
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