import React, { useState, useEffect } from "react";
import {Input, Select, DatePicker,} from "antd";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

import { AiOutlineClear, AiOutlineSearch } from 'react-icons/ai'

import Cart from './cart/Cart'
import FaceControlPagination from "./pagination/Pagination";
import "./faceControlSearch.css";

import { ip } from "../../../ip";

export default function FaceControlSearch() {

    const navigate = useNavigate()
    const {t} = useTranslation()

    const [ageFrom, setAgeFrom] = useState('');
    const [ageTo, setAgeTo] = useState('');
    const [gender, setGender] = useState('all');
    const [mask, setMask] = useState('all');
    const [mood, setMood] = useState('all')
    const [glasses, setGlasses] = useState('all');
    const [beard, setBeard] = useState('all');
    const [group, setGroup] = useState('all')
    const [camera, setCamera] = useState('all')
    const [cameraIP, setCameraIP] = useState('all');
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [faceCameraData, setFaceCameraData] = useState(null)
    const [selectedGroupCameras, setSelectedGroupCameras] = useState(null)
    const [faceControlData, setFaceControlData] = useState(null)
    const [faceControlPaginationLimit, setFaceControlPaginationLimit] = useState(24)
    const [faceControlPaginationCurrent, setFaceControlPaginationCurrent] = useState(1)
    const [faceControlTotal, setFaceControlTotal] = useState(null)


    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)
    const isDarkMode = useSelector(state => state.theme.theme_data)

    const onChangeAgeFrom = (e) => {
        setAgeFrom(e.target.value);
    };

    const onChangeAgeTo = (e) => {
        setAgeTo(e.target.value);
    };

    const onChangeGender = (e) => {
        setGender(e);
    };

    const onChangeMask = (e) => {
        setMask(e);
    };

    const onChangeBeard = (e) => {
        setBeard(e);
    };

    const onChangeGlasses = (e) => {
        if(e === 'all') {
            setGlasses(e)
        }
        else if(e === '1') {
            setGlasses([1])
        }
        else if(e === '10') {
            setGlasses([0, 10])
        }
        else {
            setGlasses([14])
        }
    };

    const onChangeGroup = (e) =>{
        setSelectedGroupCameras(faceCameraData[e])
        setCameraIP(faceCameraData[e])
        setGroup(e)
    }

    const onChangeCameraOptions = (e) => {
        setCamera(e)
        if(e === 'all') {
            setCameraIP([...selectedGroupCameras])
        }
        else {
            setCameraIP([e])
        }
    }

    const onChangeMood = e => {
        //
        if(e === 'all') {
            setMood('all')
        }
        else {
            setMood([e])
        }
    }

    const onChangeDateFrom = (e, a) => {
        setDateFrom(a);
    };

    const onChangeDateTo = (e, a) => {
        setDateTo(a);
    };

    const fetchFaceControlData = async (id) => {
        const response = await axios.get(`${ip}/api/faces/search/${faceControlPaginationLimit}/${id}`, {
            params: {
                fromDate: dateFrom,
                toDate: dateTo,
                fromAge: ageFrom,
                toAge: ageTo,
                gender,
                mask,
                beard,
                glasses,
                mood,
                ip: cameraIP

            }
        })
        const { data } = response;
        const count = data.count;
        setFaceControlTotal(count)
        setFaceControlData(data.data)
    }

    const faceControlPaginationOnChange = (e = 1, option) => {
        fetchFaceControlData(e)
        setFaceControlPaginationCurrent(e)
        setFaceControlPaginationLimit(option)
    }

    const clear = () => {
        // 
        setAgeFrom('')
        setAgeTo('')
        setGender('all')

        setMask('all')
        setMood('all')
        setGlasses('all')
        setBeard('all')

        setCameraIP('all')

        onChangeGroup('all')
        onChangeCameraOptions('all')

        setDateFrom('')
        setDateTo('')

        setFaceControlTotal(null)
        setFaceControlData(null)
    }

    useEffect(() => {
        fetchFaceControlData(faceControlPaginationCurrent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [faceControlPaginationLimit, faceControlPaginationCurrent])

    useEffect(() => {
        if(!is_refresh_value) {
            navigate('/face-control-search')
        }

       axios.get(`${ip}/api/camera/list/ip`)
           .then(res => {
               setFaceCameraData(res.data)
               setSelectedGroupCameras(res.data.all)
               setCameraIP(res.data.all)
           })
           .catch(err => {
               //
           })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="face_control_search">
                <div className="face_control_search_header">
                    <div className="content_top">
                        <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>{t('tasvirlar')}</p>
                    </div>
                    <div className = "content_pagination" >
                        <p className = {`content_total ${isDarkMode && 'darkModeColor'}`}>{t('Jami')}: {faceControlTotal}</p>
                        <FaceControlPagination
                            accessTablePaginationLimit = {faceControlPaginationLimit}
                            accessTablePaginationCurrent = {faceControlPaginationCurrent}
                            accessTablePaginationOnChange = {faceControlPaginationOnChange}
                            accessTableTotal = {faceControlTotal}
                        />
                    </div>
                </div>

                <div className={`content ${isDarkMode && 'darkModeCard'}`}>
                    <div className={`content_inputs ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                        <div>
                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Yoshi')}:</p>
                                <div className="input_wrapper">
                                    <Input
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeAgeFrom}
                                        value={ageFrom}
                                        type="number"
                                        size="large"
                                        style={{marginRight: "10px"}}
                                        placeholder={t('dan')}
                                    />
                                    <Input
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeAgeTo}
                                        value={ageTo}
                                        type="number"
                                        size="large"
                                        placeholder={t('gacha')}
                                    />
                                </div>
                            </div>

                          <div className="face_control_search_inline_inputs">
                              <div className="form_input_wrapper">
                                  <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Jinsi')}:</p>
                                  <div className="input_wrapper face_search_inputs">
                                      <Select
                                          className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                          onChange={onChangeGender}
                                          style={{width: "100%"}}
                                          size="large"
                                          defaultValue={gender}
                                          value={gender}
                                      >
                                          <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                          <Select.Option value="1">{t('Erkak')}</Select.Option>
                                          <Select.Option value="2">{t('Ayol')}</Select.Option>
                                      </Select>
                                  </div>
                              </div>

                              <div className="form_input_wrapper">
                                  <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Niqob')}:</p>
                                  <div className="input_wrapper face_search_inputs">
                                      <Select
                                          className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                          onChange={onChangeMask}
                                          style={{width: "100%"}}
                                          size="large"
                                          defaultValue={mask}
                                          value={mask}
                                      >
                                          <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                          <Select.Option value="1">{t('Bor')}</Select.Option>
                                          <Select.Option value="0">{t("Yo’q")}</Select.Option>
                                      </Select>
                                  </div>
                              </div>
                          </div>

                            <div className="face_control_search_inline_inputs">

                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Kayfiyat')}:</p>
                                    <div className="input_wrapper face_search_inputs">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            onChange={onChangeMood}
                                            style={{width: "100%"}}
                                            size="large"
                                            defaultValue={mood}
                                            value={mood}
                                        >
                                            <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                            <Select.Option value="2">{t('Jilmaygan')}</Select.Option>
                                            <Select.Option value="3">{t('Jahldor')}</Select.Option>
                                            <Select.Option value="4">{t('Xafa')}</Select.Option>
                                            <Select.Option value="5">{t('Jirkangan')}</Select.Option>
                                            <Select.Option value="6">{t("Qo’rqqan")}</Select.Option>
                                            <Select.Option value="7">{t('Hayratda')}</Select.Option>
                                            <Select.Option value="8">{t("E’tiborsiz")}</Select.Option>
                                            <Select.Option value="9">{t("Kulgan")}</Select.Option>
                                            <Select.Option value="11">{t('Xursand')}</Select.Option>
                                            <Select.Option value="12">{t('Ikkilangan')}</Select.Option>
                                            <Select.Option value="13">{t('Baqirgan')}</Select.Option>
                                        </Select>
                                    </div>
                                </div>


                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t("Ko’zoynak")}:</p>
                                    <div className="input_wrapper face_search_inputs">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            onChange={onChangeGlasses}
                                            style={{width: "100%"}}
                                            size="large"
                                            defaultValue={glasses}
                                            value={glasses}
                                        >
                                            <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                            <Select.Option value="1">{t("Ko’rishni_tuzatish")}</Select.Option>
                                            <Select.Option value="10">{t('Kozoynaksiz')}</Select.Option>
                                            <Select.Option value="14">{t('Quyoshdan_himoya')}</Select.Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="face_control_search_inline_inputs">

                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Soqol')}:</p>
                                    <div className="input_wrapper face_search_inputs">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            onChange={onChangeBeard}
                                            style={{width: "100%"}}
                                            size="large"
                                            defaultValue={beard}
                                            value={beard}
                                        >
                                            <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                            <Select.Option value="1">{t('Bor')}</Select.Option>
                                            <Select.Option value="0">{t("Yo’q")}</Select.Option>
                                        </Select>
                                    </div>
                                </div>

                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Guruh')}:</p>
                                    <div className="input_wrapper face_search_inputs">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            onChange={onChangeGroup}
                                            style={{width: "100%"}}
                                            size="large"
                                            defaultValue={group}
                                            value={group}
                                        >
                                            <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                            <Select.Option value="door_navruz">Navruz bog'i</Select.Option>
                                            <Select.Option value="door_makro">Makro</Select.Option>
                                            <Select.Option value="door_parking">Avtoturargoh</Select.Option>
                                            <Select.Option value="door_anhor">Efendi</Select.Option>
                                            <Select.Option value="door_koprik">Olimpiya muzeyi</Select.Option>
                                        </Select>
                                    </div>
                                </div>

                            </div>

                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Kamera')}:</p>
                                <div className="input_wrapper face_search_inputs">
                                    <Select
                                        className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeCameraOptions}
                                        style={{width: "100%"}}
                                        size="large"
                                        defaultValue={camera}
                                        value={camera}
                                    >
                                        <Select.Option value="all">{t('Hammasi')}</Select.Option>
                                        {
                                            selectedGroupCameras && selectedGroupCameras.map(item => (
                                                <Select.Option key = {item} value={item}>{item}</Select.Option>
                                            ))
                                        }
                                    </Select>
                                </div>
                            </div>



                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>{t('Muddat')}:</p>
                                <div className="input_wrapper">
                                    <DatePicker
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        placeholder={`${moment(new Date()).format(
                                            "DD.MM.YYYY, 00:00:00"
                                        )}`}
                                        onChange={onChangeDateFrom}
                                        size="large"
                                        style={{width: "100%"}}
                                        showTime
                                        value={dateFrom !== "" ? moment(dateFrom) : ""}
                                    />
                                </div>
                                <div className="input_wrapper" style={{marginTop: "15px"}}>
                                    <DatePicker
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        placeholder={`${moment(new Date()).format(
                                            "DD.MM.YYYY, 23:59:59"
                                        )}`}
                                        onChange={onChangeDateTo}
                                        size="large"
                                        style={{width: "100%"}}
                                        showTime
                                        value={dateTo !== "" ? moment(dateTo) : ""}
                                        // format="DD-MM-YYYY, HH:mm:ss"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form_input_wrapper add_clear_button" style={{marginTop: "15px"}}>
                            <div className="input_wrapper">
                                <button
                                    type="button"
                                    className="soft_btn"
                                    onClick={() => fetchFaceControlData(1)}
                                >
                                    <AiOutlineSearch size={24} style = {{marginRight: '5px'}} />
                                    Qidirish
                                </button>
                            </div>

                            <div className="input_wrapper">
                                <button
                                    type="button"
                                    className="clear_button"
                                    onClick={clear}
                                >
                                    <AiOutlineClear size={24} style = {{marginRight: '5px'}} />
                                    Filterni tozalash
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={`content_right ${isDarkMode && 'darkModeBackground darkModeBorder'} `}>
                        <div className = "my_content">
                            <div className = "my_cart_wrapper">
                                {
                                    faceControlData && faceControlData.map(item => (
                                        <Cart  key = {item.id} item = {item} isDarkMode={isDarkMode} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
