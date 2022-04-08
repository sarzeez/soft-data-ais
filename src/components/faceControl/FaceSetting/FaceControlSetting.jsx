import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {MdAdd, MdOutlineAddCircleOutline,} from "react-icons/md";
import { Tabs} from "antd";
import {AiOutlineDelete} from "react-icons/all";
import {ip} from "../../../ip";

import CameraTable from "./table/CameraTable";
import AddCameraModal from "./AddCameraModal/AddCameraModal";
import AddNewGroupTable from "./AddNewGroup/AddNewGroupTable";
import AddNewGroup from "./AddNewGroup/AddNewGroup";

import axios from "axios";
import './faceSetting.css';
import CameraPagenation from "./pagenation/CameraPagenation";

const { TabPane } = Tabs;

const FaceControlSetting = () => {
    const {t} = useTranslation()
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

    const [cameraData, setCameraData] = useState([]);

    const [state, setState] = useState({selectedRowKeys: []})
    const onSelectChange = (selectedRowKeys, a) => {
        setState({ selectedRowKeys })
        setDeleteCamera(a.map(item => item.id));
    };

    const { selectedRowKeys } = state;

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    }

      const getCameraData = async (id) => {
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

    const addCamera = () => {
        setIsOpenAddCamera(true)
    }

    const handleDeleteCamera = () => {
        axios.delete(`${ip}/api/camera/delete`,{data: deleteCamera})
            .then(res =>{
                getCameraData(cameraPaginationCurrent);
                setState({selectedRowsKeys:[]})
                setDeleteCamera([])
            })
            .catch(err => {
                // console.log(err?.response?.data)
            })
    }

    const onChangeTabs = (key) => {
        // console.log(key);
    }

    const getCameraGroup = async () =>{
        const response = await axios.get(`${ip}/api/camera_group`)
        const { data } = response;
        const newData = data && data.map((item, index) => (
            {
                ...item,
                key: 1000 * index + 1,
                name_uz: item.name_uz,
                name_ru: item.name_ru,
                name_en: item.name_en,
            }
        ))
        setLanguageGroup(newData);
    }

    const handleDeleteGroup = () => {
        axios.delete(`${ip}/api/camera_group/delete`,{data: deleteGroup})
            .then(res =>{
                getCameraGroup();
            })
            .catch(err => {
                // console.log(err?.response?.data)
            })
    }

    // console.log(deleteGroup);

    const cameraPaginationOnChange = (e = 1, option) => {
        getCameraData(e)
        setCameraPaginationCurrent(e)
        setCameraPaginationLimit(option)
    }


    useEffect(() =>{
        getCameraData(cameraPaginationCurrent)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cameraPaginationLimit, cameraPaginationCurrent,  ])

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
                    <p className= {`Content_title ${isDarkMode && 'darkModeColor'}`} >{t("Yuzni aniqlash sozlamalar")}</p>
                </div>
            </div>

            <div className="face_control_setting_body">
                <Tabs onChange={onChangeTabs} type="card" defaultActiveKey="1">

                    <TabPane tab={t("Kamera parametrlari")} key="1">
                        <div className="face_control_setting_tab">

                            <div className='face_control_setting_tab_item'>
                                <AddCameraModal
                                    isOpenAddCamera={isOpenAddCamera}
                                    setIsOpenAddCamera={setIsOpenAddCamera}
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
                                            setIsOpenAddCamera={setIsOpenAddCamera}
                                            setDeleteCamera={setDeleteCamera}
                                            setCameraInitialValues = {setCameraInitialValues}
                                            rowSelection={rowSelection}

                                        />
                                    </div>
                                </div>
                                <div className='face_control_setting_tab_item_footer'>
                                    <div className="face_control_setting_tab_item_footer_buttons">
                                        <button onClick={addCamera} className='face_control_setting_button'>
                                            <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>
                                            {t("Kamera qo‘shish")}
                                        </button>
                                        {
                                            deleteCamera.length > 0 &&
                                            <button onClick={handleDeleteCamera}
                                                    className="face_control_setting_footer_delite_button">
                                                <AiOutlineDelete size={22}/>
                                                {t("O’chirish")}
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
                                            <button onClick={() => setShow(true)} className="camera_groups_button">
                                                <MdOutlineAddCircleOutline size={24} style = {{marginRight: '5px'}}/>
                                                {t("Guruh qo’shish")}
                                            </button>
                                            {
                                                deleteGroup.length > 0 &&
                                                <button onClick={handleDeleteGroup}   className="group_delite_button">
                                                    <AiOutlineDelete size={22}/>
                                                    {t("O’chirish")}
                                                </button>
                                            }
                                        </div>
                                        :
                                        <AddNewGroup
                                            groupIntialValues={groupIntialValues}
                                            setGroupInitialValues={setGroupInitialValues}
                                            show={show}
                                            setShow={setShow}
                                            cameraPaginationCurrent={cameraPaginationCurrent}
                                            getCameraGroup={getCameraGroup}
                                            languageGroup={languageGroup}
                                        />
                                }
                            </div>
                        </div>
                    </TabPane>

                    <TabPane tab={t("Autentifikatsiya sozlamalari")} key="2">
                        <div className='access_control_setting_tab_item access_control_setting_tab_item_single'>
                            <div className='access_control_setting_tab_item_body'>
                                Autentifikatsiya sozlamalari
                            </div>
                        </div>
                    </TabPane>

                    {/*<TabPane tab={t("Statistika sozlamalari")} key="3">*/}
                    {/*    <div className='access_control_setting_tab_item access_control_setting_tab_item_single'>*/}
                    {/*        <div className='access_control_setting_tab_item_body'>*/}
                    {/*            Content of Tab Pane 3*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</TabPane>*/}

                </Tabs>
            </div>
        </div>
    );
};

export default FaceControlSetting;