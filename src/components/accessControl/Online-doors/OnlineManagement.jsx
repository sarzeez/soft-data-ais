import React, {useState, useEffect} from 'react';
import downImg from "../../../images/newimages/downn.png";
import managmentImg from "../../../images/newimages/managmentImg.svg";
import cameraOff from "../../../images/newimages/cameraOff.svg";
import cameraOn from "../../../images/newimages/cameraOn.svg";
import Modal from "react-modal";
import "./onlineManegment.css";
import {Form, Input, Select} from "antd";
import uzbek from "../../../images/uzbek.svg";
import russia from "../../../images/russia.svg";
import engliz from "../../../images/engliz.svg";
import axios from "axios";
import {ip} from "../../../ip";
import "bootstrap/dist/css/bootstrap.css";

const OnlineManagement = () => {
    const [openModal, setOpenmodal] = useState(false);
    const modalOpen = () => {
        setOpenmodal(true);
    }

    const customStyles = {
        content: {
            width : "30%",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',

        },
    };
    let subtitle;
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
    }

    const [terminals , setTerminals] = useState([]);
    useEffect(()=>{
        axios.get(ip + "/api/adduser/terminal")
            .then((res)=>{
                setTerminals(res.data);
            })
    },[])

    return (
        <div>
            <div className="online_managment">
                <div className="online_managment_title">
                    <div className="content_top">
                        <p className="p-0 m-0 content_title">Onlayn boshqaruv</p>
                        <button type="button" className="content_button btn mb-2 d-flex align-items-center">
                            Terminallar joylashuvi<img src={downImg} className=""/>
                        </button>
                    </div>
                </div>

                <div className="online_doors_body">
                    <div className="online_doors_managment">
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Eshik tanlang</button>
                        </div>
                    </div>
                    <div className="online_doors_managment">
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Eshik tanlang</button>
                        </div>
                    </div>
                    <div className="online_doors_managment">
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Eshik tanlang</button>
                        </div>
                    </div>
                    <div className="online_doors_managment">
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Eshik tanlang</button>
                        </div>
                    </div>
                </div>

                <>
                    <Modal
                        isOpen={openModal}
                        onRequestClose={()=>setOpenmodal(!openModal)}
                        // onRequestClose={() => setIsOpenAddCamera(cancel)}
                        contentLabel="My dialog"
                        className="mymodal"
                        overlayClassName="myoverlay"
                        closeTimeoutMS={0}
                    >

                        <div className="online_doors_modal">
                            <h4>Terminallar ro'yxati</h4>
                            <div className="online_doors_modal_bodyOne">
                                <div className="online_doors_modal_body">
                                    {terminals.map((item,index)=>{
                                        return(
                                            <div className="online_doors_modal_body_inner" key={item.id}>
                                                <div className="d-flex align-items-start">
                                                    {/*<svg>*/}
                                                    <img src={cameraOff}/>
                                                    {/*</svg>*/}
                                                    <div className="ml-2">
                                                        <h5>{item.door_name}</h5>
                                                        <span>Chiqish eshigi</span>
                                                    </div>
                                                </div>
                                                <div className="linee">

                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </Modal>
                </>
            </div>
        </div>
    );
};

export default OnlineManagement;
