import React, { useState } from 'react';
import ImageDemo from "./image";
import moment from "moment";
import { emojes } from '../../../../assets/face-icons/icons'
import "./cart.css"

import { BsPlayBtn } from 'react-icons/bs'

import VideoModal from '../videoModal/VidoeModal';

const mood = ["", "Tabassum", "Jahldor", "Xafa", "Jirkangan", "Qo'rqqan", "Hayratda", "E'tiborsiz", "Kulgan", "", "Xursand", "Ikkilangan", "Baqirgan"]

const Cart = ({ item, isDarkMode }) => {

    const [visible, setVisible] = useState(false)

    return (
        <div className={`j_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
            <div className="j_cardInfo">
                <VideoModal visible={visible} setVisible={setVisible}/>
                <div className="j_cardInfoTop">
                    <div className="j_cardInfoTopLeft">
                        <div onClick={() => setVisible(true)} className='face-control-video-block'>
                            <BsPlayBtn color='#fff' size={20}/>
                        </div>
                        <ImageDemo id = {item.id} />
                        <div className="visit_time_info">
                            <p className="ddmmyy">{moment(item.the_date).format("DD.MM.YYYY")}</p>
                            <p className="hhmmss">{moment(item.the_date).format("HH:mm:ss")}</p>
                        </div>
                    </div>
                    <div className="j_cardInfoTopRight">
                        <div>
                            {
                                item.gender === 2
                                ? <img src = {emojes.female['female']} alt = ''/>
                                : <img src = {emojes.male['male']} alt = '' />
                            }
                            <p>{item.gender === 1 ? 'Erkak' : item.gender === 2 ? 'Ayol' : ''}</p>
                        </div>
                        <div>
                            {
                                item.gender === 2
                                ? <img src = {emojes.female[item.old]} alt = ''/>
                                : <img src = {emojes.male[item.old]} alt = '' />
                            }
                            <p>
                                {
                                   item && item.old === 'age_0_10'
                                        ? "Yosh bola"
                                        : item.old === 'age_11_17' ? "O'smir"
                                            : item.old === 'age_18_25' ? "O'spirin"
                                                : item.old === 'age_26_40' ? "O'rta yoshli"
                                                    : item.old === 'age_41_60' ? "Katta yoshli"
                                                        : "Keksa"
                                }
                            </p>
                        </div>
                        <div>
                            {
                                <img src = {emojes.mask[item.args.MASKA]} alt = 'mask'/>
                            }
                            <p>{item.args.MASKA === 1 ? 'Niqobli' : item.args.MASKA === 0 ? 'Niqobsiz' : ''}</p>
                        </div>
                        <div>
                            {
                                <img src = {emojes.mood[item.args.KAYFIYAT - 1]} alt = 'mood' />
                            }
                            <p>{mood[item.args.KAYFIYAT - 1]}</p>
                        </div>
                        <div>
                            {
                                <img src = {emojes.glass[item.args.KOZOYNAK]} alt = 'glass' />
                            }
                            <p className="card_longTitle" >{item.args.KOZOYNAK === 1 ? "Ko'rishni tuzatish" : item.args.KOZOYNAK === 14 ? "Quyoshdan himoya" : "Ko'zoynaksiz"}</p>
                        </div>
                        
                        <div>
                            {
                                item.gender !== 2 
                                ?
                                (item.old !== 'age_0_10' && item.old !== 'age_11_17' && <img src = {emojes.beard[item.args.SOQOL]} alt = 'glass' />)
                                : ''
                            }
                            <p>
                                {
                                    item.gender === 2
                                    ? ''
                                    : (item.old !== 'age_0_10' && item.old !== 'age_11_17' && (item.args.SOQOL === 1 ? 'Soqolli' : item.args.SOQOL === 0 ? 'Soqolsiz' : ''))
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Cart;