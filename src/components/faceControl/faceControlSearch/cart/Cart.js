import React, { useState } from 'react';
import { ip } from '../../../../ip';
import {useTranslation} from "react-i18next";
import {Tooltip} from "antd";
import { emojes } from '../../../../assets/face-icons/icons';
import { BsPlayBtn } from 'react-icons/bs'

import moment from "moment";
import axios from 'axios';
import ImageDemo from "./image";
import "./cart.css";
import VideoModal from '../videoModal/VidoeModal';





const Cart = ({ item, isDarkMode }) => {

    const {t} = useTranslation()
    const mood = ["", "Tabassum", <div>{t('Jahldor')}</div> , <div>{t('Xafa')}</div>, <div>{t('Jirkangan')}</div> , <div>{t('Qo’rqqan')}</div>, <div>{t('Hayratda')}</div> ,<div>{t('E’tiborsiz')}</div>, <div>{t('Kulgan')}</div>, "",<div>{t('Xursand')}</div>, <div>{t('ikkilnagna')}</div>,<div>{t('Baqirgan')}</div>]
    const [visible, setVisible] = useState(false)
    const [videoByID, setVideoByID] = useState(null)
    const [loading, setLoading] = useState(false)
    // console.log(item);

    const handleClickVideoPlay = (id) => {
        setVisible(true)
        setLoading(true)
        const interval = setInterval(() => {
            axios(`${ip}/api/face/video/${id}`)
            .then(res => {
                const { data } = res;
                if(data !== 'wait') {
                    setVideoByID(data)
                    setLoading(false)
                    clearInterval(interval)
                }
                else {
                    setLoading(true)
                }
            })
            .catch(err => {
                setLoading(false)
                clearInterval(interval)
            })

        }, 2000)

        setTimeout(() => {
                clearInterval(interval)
            }, 1000*60)
        
    }

    return (
        <div className={`j_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
            <div className="j_cardInfo">
                <VideoModal visible={visible} setVisible={setVisible} loading = {loading} videoByID = {videoByID} id = {item.id}/>
                <div className="j_cardInfoTop">
                    <div className="j_cardInfoTopLeft">
                        <div onClick={() => handleClickVideoPlay(item.id)} className='face-control-video-block'>
                            <BsPlayBtn color='#fff' size={20}/>
                        </div>
                        <ImageDemo id = {item.id} />
                        <div className="visit_time_info">
                            <p className="ddmmyy">{moment(item.the_date).format("DD.MM.YYYY")}</p>
                            <p className="hhmmss">{moment(item.the_date).format("HH:mm:ss")}</p>
                        </div>
                    </div>

                    <div className="j_cardInfoTopRight">
                        <div className="line"></div>
                        <div className="line_2"></div>
                        <div className="y_line"></div>
                        <div>
                            {
                                item.gender === 2
                                ? <img src = {emojes.female['female']} alt = ''/>
                                : <img src = {emojes.male['male']} alt = '' />
                            }
                            <p className="card_longTitle">{item.gender === 1 ? <div>{t('Erkak')}</div>  : item.gender === 2 ? <div>{t('Ayol')}</div>  : ''}</p>
                        </div>
                        <div>
                            {
                                item.gender === 2
                                ? <img src = {emojes.female[item.old]} alt = ''/>
                                : <img src = {emojes.male[item.old]} alt = '' />
                            }
                            <p className="card_longTitle" >
                                {
                                   item && item.old === 'age_0_10'
                                        ? <Tooltip title={t('Yosh bola')} color={'cyan'}>{t('Yosh bola')}</Tooltip>
                                        : item.old === 'age_11_17' ?  <Tooltip title={t('O\'smir')} color={'cyan'}>{t('O\'smir')}</Tooltip>
                                            : item.old === 'age_18_25' ? <Tooltip title={t('O\'spirin')} color={'cyan'}>{t('O\'spirin')}</Tooltip>
                                                : item.old === 'age_26_40' ? <Tooltip title={t('O\'rta yoshli')} color={'cyan'}>{t('O\'rta yoshli')}</Tooltip>
                                                    : item.old === 'age_41_60' ? <Tooltip title={t('Katta yoshli')} color={'cyan'}>{t('Katta yoshli')}</Tooltip>
                                                        : <Tooltip title={t('Keksa')} color={'cyan'}>{t('Keksa')}</Tooltip>
                                }
                            </p>
                        </div>


                        <div>
                            {
                                <img src = {emojes.mask[item.args.MASKA]} alt = 'mask'/>
                            }
                            <p className="card_longTitle" >{item.args.MASKA === 1 ? <Tooltip title={t('Niqobli')} color={'cyan'}>{t('Niqobli')}</Tooltip>  : item.args.MASKA === 0
                                ? <Tooltip title={t('Niqobsiz')} color={'cyan'}>{t('Niqobsiz')}</Tooltip> : ''}</p>
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
                            <p className="card_longTitle" >{item.args.KOZOYNAK === 1 ?
                                <Tooltip title={t('Ko’rishni_tuzatish')} color={'cyan'}>{t('Ko’rishni_tuzatish')}</Tooltip>  :
                                item.args.KOZOYNAK === 14 ? <Tooltip title={t('Quyoshdan_himoya')} color={'cyan'}>{t('Quyoshdan_himoya')}</Tooltip> :
                                    <Tooltip title={t('Kozoynaksiz')} color={'cyan'}>{t('Kozoynaksiz')}</Tooltip> }
                            </p>
                        </div>
                        
                        <div>
                            {
                                item.gender !== 2 
                                ?
                                (item.old !== 'age_0_10' && item.old !== 'age_11_17' && <img src = {emojes.beard[item.args.SOQOL]} alt = 'glass' />)
                                : ''
                            }
                            <p className="card_longTitle">
                                {
                                    item.gender === 2
                                    ? ''
                                    : (item.old !== 'age_0_10' && item.old !== 'age_11_17' && (item.args.SOQOL === 1 ?
                                            <Tooltip title={t('Soqolli')} color={'cyan'}>{t('Soqolli')}</Tooltip> :
                                            item.args.SOQOL === 0 ? <Tooltip title={t('Soqolsiz')} color={'cyan'}>{t('Soqolsiz')}</Tooltip> : ''))
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