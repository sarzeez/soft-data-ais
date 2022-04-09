import React, {useState, useEffect} from 'react';
import downImg from "../../../images/newimages/downn.png";
import managmentImg from "../../../images/newimages/managmentImg.svg";
import cameraOnn from "../../../images/newimages/access-control 1.svg";
import cameraOff from "../../../images/newimages/accesscontrolOff.svg";
import cameraOn from "../../../images/newimages/cameraOn.svg";
import terminalImg1 from "../../../images/newimages/terminalImg/terminalImgone.svg"
import terminalImg2 from "../../../images/newimages/terminalImg/terminalimgtwo.svg"
import terminalImg3 from "../../../images/newimages/terminalImg/terminalimgthree.svg"
import terminalImg4 from "../../../images/newimages/terminalImg/terminalimgfour.svg"
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
            transform: 'translate(-50%, -50%)'
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
                console.log(res)
                setTerminals(res.data);
            })
    },[])

    const [doorOne , setDoorOne] = useState(true);
    const [doorTwo , setDoorTwo] = useState(false);
    const [doorThree , setDoorThree] = useState(false);
    const [doorFour , setDoorFour] = useState(false);

    const terminal1 = () =>{
        setDoorOne(true);
        setDoorTwo(false);
        setDoorThree(false);
        setDoorFour(false);
    }
    const terminal2 = () =>{
        setDoorOne(true);
        setDoorTwo(true);
        setDoorThree(false);
        setDoorFour(false);
    }
    const terminal3 = () =>{
        setDoorOne(true);
        setDoorTwo(true);
        setDoorThree(true);
        setDoorFour(false);
    }
    const terminal4 = () =>{
        setDoorOne(true);
        setDoorTwo(true);
        setDoorThree(true);
        setDoorFour(true);
    }
    return (
        <div>
            <div className="online_managment">
                <div className="online_managment_title">
                    <div className="content_top">
                        <p className="content_title">Eshiklar boshqaruvi</p>
                        <div className="content_button d-flex align-items-center">
                            <span>Terminallar joylashuvi :</span>
                            <button type="button" className="btn" onClick={terminal1}><img src={terminalImg1}/></button>
                            <button type="button" className="btn" onClick={terminal2}><img src={terminalImg2}/></button>
                            <button type="button" className="btn" onClick={terminal3}><img src={terminalImg3}/></button>
                            <button type="button" className="btn" onClick={terminal4}><img src={terminalImg4}/></button>
                        </div>
                    </div>
                </div>

                <div className="online_doors_body">
                    <div className={doorOne===true&&doorTwo===false&&doorThree===false&&doorFour===false ? "online_doors_managment_one" :
                        ("online_doors_managment")
                    }>
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Iltimos eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Tanlash</button>
                        </div>
                    </div>
                    <div className={doorTwo===true ? "online_doors_managment" : "online_doors_managment d-none"}>
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Iltimos eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Tanlash</button>
                        </div>
                    </div>
                    <div className={doorThree===true ? "online_doors_managment" : "online_doors_managment d-none"}>
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Iltimos eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Tanlash</button>
                        </div>
                    </div>
                    <div className={doorFour===true ? "online_doors_managment" : "online_doors_managment d-none"}>
                        <div className="online_doors_managment_body">
                            <img src={managmentImg}/>
                            <h2>Iltimos eshikni tanlang</h2>
                            <button type="button" className="btn" onClick={modalOpen}>Tanlash</button>
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
                                                    <img src={cameraOff}/>
                                                    <div className="ml-2">
                                                        <h5>{item.door_name}</h5>
                                                        <span>{item.direction==="Entry" ? "Kirish eshigi" : "Chiqish eshigi" }</span>
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
