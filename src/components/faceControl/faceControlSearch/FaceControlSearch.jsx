import React, { useState, useEffect } from "react";
import {Input, Select, DatePicker,} from "antd";
import {SearchOutlined, } from "@ant-design/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./faceControlSearch.css";
import { ip } from "../../../ip";

import Cart from './cart/Cart'
import AccessControlSearchPagination from "../../accessControl/accessControlSearch/Pagination";

export default function FaceControlSearch() {

    const navigate = useNavigate()

    const [ageFrom, setAgeFrom] = useState('');
    const [ageTo, setAgeTo] = useState('');
    const [gender, setGender] = useState('all');
    const [mask, setMask] = useState('all');
    const [beard, setBeard] = useState('all');
    const [mood, setMood] = useState('all')
    const [glasses, setGlasses] = useState('all');
    const [cameraIP, setCameraIP] = useState('all');
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [faceCameraData, setFaceCameraData] = useState(null)
    const [selectedGroupCameras, setSelectedGroupCameras] = useState(null)
    const [faceControlData, setFaceControlData] = useState(null)
    const [faceControlPaginationLimit, setFaceControlPaginationLimit] = useState(12)
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
    }

    const onChangeCameraOptions = (e) => {
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
                        <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>Qidiruv</p>
                    </div>
                    <div className = "content_pagination" >
                        <p className = {`content_total ${isDarkMode && 'darkModeColor'}`}>Jami: {faceControlTotal}</p>
                        <AccessControlSearchPagination
                            accessTablePaginationLimit = {faceControlPaginationLimit}
                            accessTablePaginationCurrent = {faceControlPaginationCurrent}
                            accessTablePaginationOnChange = {faceControlPaginationOnChange}
                            accessTableTotal = {faceControlTotal}
                        />
                    </div>
                </div>
                <div className="content">
                    <div className={`content_inputs ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                        <div>
                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Yoshi:</p>
                                <div className="input_wrapper">
                                    <Input
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeAgeFrom}
                                        type="number"
                                        size="large"
                                        style={{marginRight: "10px"}}
                                        placeholder="dan"
                                    />
                                    <Input
                                        className={`left_input ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeAgeTo}
                                        type="number"
                                        size="large"
                                        placeholder="gacha"
                                    />
                                </div>
                            </div>

                          <div className="face_control_search_inline_inputs">
                              <div className="form_input_wrapper">
                                  <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Jinsi:</p>
                                  <div className="input_wrapper face_search_inputs">
                                      <Select
                                          className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                          onChange={onChangeGender}
                                          style={{width: "100%"}}
                                          size="large"
                                          defaultValue="all"
                                      >
                                          <Select.Option value="all">Hammasi</Select.Option>
                                          <Select.Option value="1">Erkak</Select.Option>
                                          <Select.Option value="2">Ayol</Select.Option>
                                      </Select>
                                  </div>
                              </div>

                              <div className="form_input_wrapper">
                                  <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Niqob:</p>
                                  <div className="input_wrapper face_search_inputs">
                                      <Select
                                          className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                          onChange={onChangeMask}
                                          style={{width: "100%"}}
                                          size="large"
                                          defaultValue="all"
                                      >
                                          <Select.Option value="all">Hammasi</Select.Option>
                                          <Select.Option value="1">Bor</Select.Option>
                                          <Select.Option value="0">Yo'q</Select.Option>
                                          <Select.Option value="2">Aniqlanmadi</Select.Option>
                                      </Select>
                                  </div>
                              </div>
                          </div>

                            <div className="face_control_search_inline_inputs">
                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Soqol:</p>
                                    <div className="input_wrapper face_search_inputs">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            onChange={onChangeBeard}
                                            style={{width: "100%"}}
                                            size="large"
                                            defaultValue="all"
                                        >
                                            <Select.Option value="all">Hammasi</Select.Option>
                                            <Select.Option value="1">Bor</Select.Option>
                                            <Select.Option value="0">Yo'q</Select.Option>
                                            <Select.Option value="2">Aniqlanmadi</Select.Option>
                                        </Select>
                                    </div>
                                </div>

                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Ko'zoynak:</p>
                                    <div className="input_wrapper face_search_inputs">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            onChange={onChangeGlasses}
                                            style={{width: "100%"}}
                                            size="large"
                                            defaultValue="all"
                                        >
                                            <Select.Option value="all">Hammasi</Select.Option>
                                            <Select.Option value="1">Ko'rishni tuzatish</Select.Option>
                                            <Select.Option value="10">Ko'zoynaksiz</Select.Option>
                                            <Select.Option value="14">Quyoshdan himoya</Select.Option>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="face_control_search_inline_inputs">

                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Guruh:</p>
                                    <div className="input_wrapper face_search_inputs">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            onChange={onChangeGroup}
                                            style={{width: "100%"}}
                                            size="large"
                                            defaultValue="all"
                                        >
                                            <Select.Option value="all">Hammasi</Select.Option>
                                            <Select.Option value="door_navruz">Navruz bog'i</Select.Option>
                                            <Select.Option value="door_makro">Makro</Select.Option>
                                            <Select.Option value="door_parking">Avtoturargoh</Select.Option>
                                            <Select.Option value="door_anhor">Efendi</Select.Option>
                                            <Select.Option value="door_koprik">Olimpiya muzeyi</Select.Option>
                                        </Select>
                                    </div>
                                </div>

                                <div className="form_input_wrapper">
                                    <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Kamera:</p>
                                    <div className="input_wrapper face_search_inputs">
                                        <Select
                                            className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                            onChange={onChangeCameraOptions}
                                            style={{width: "100%"}}
                                            size="large"
                                            defaultValue="all"
                                        >
                                            <Select.Option value="all">Hammasi</Select.Option>
                                            {
                                               selectedGroupCameras && selectedGroupCameras.map(item => (
                                                   <Select.Option key = {item} value={item}>{item}</Select.Option>
                                               ))
                                            }
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Kayfiyat:</p>
                                <div className="input_wrapper face_search_inputs">
                                    <Select
                                        className={`left_select ${isDarkMode && 'darkModeColor'}`}
                                        onChange={onChangeMood}
                                        style={{width: "100%"}}
                                        size="large"
                                        defaultValue="all"
                                    >
                                        <Select.Option value="all">Hammasi</Select.Option>
                                        <Select.Option value="2">Jilmaygan</Select.Option>
                                        <Select.Option value="3">Jahldor</Select.Option>
                                        <Select.Option value="4">Xafa</Select.Option>
                                        <Select.Option value="5">Jirkangan</Select.Option>
                                        <Select.Option value="6">Qo'rqqan</Select.Option>
                                        <Select.Option value="7">Hayratda</Select.Option>
                                        <Select.Option value="8">E'tiborsiz</Select.Option>
                                        <Select.Option value="9">Kulgan</Select.Option>
                                        <Select.Option value="11">Xursand</Select.Option>
                                        <Select.Option value="12">Ikkilangan</Select.Option>
                                        <Select.Option value="13">Baqirgan</Select.Option>
                                    </Select>
                                </div>
                            </div>

                            <div className="form_input_wrapper">
                                <p className={`input_label ${isDarkMode && 'darkModeColor'}`}>Muddat:</p>
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
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form_input_wrapper" style={{marginTop: "20px"}}>
                            <div className="input_wrapper">
                                <button
                                    type="button"
                                    className="soft_btn"
                                    onClick={() => fetchFaceControlData(1)}
                                    icon={<SearchOutlined/>}
                                    size="large"
                                    style={{width: "100%"}}
                                >
                                    Qidirish
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
