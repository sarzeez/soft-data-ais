import React, { useEffect, useState } from 'react';
import { DatePicker} from 'antd';
import Carousel, { consts } from 'react-elastic-carousel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from "moment";

import next from '../../../images/nexticon.svg';
import prev from '../../../images/previcon.svg';

import './analysis.css';
import { ip } from '../../../ip';

import MiniChart from './miniCharts/index'
import BodyChart from './bodyChart/BodyChart'
import PieChart from './pieChart/PieChart'
import LineChart from './lineChart/LineChart'


const FaceControlAnalysis = () => {

    function myArrow({ type, onClick, isEdge }) {
        const pointer = type === consts.PREV ?  <img className="prev" src={prev} alt=""/> : <img className="next" src={next} alt=""/>
        return (
            <button className="nexprev" onClick={onClick} disabled={isEdge}>
                {pointer}
            </button>
        )
    }

    const navigate = useNavigate()
    const is_refresh_value = useSelector(state => state.theme.is_refresh_value)
    const [active, setActive] = useState('daily')
    const [date, setDate] = useState(new Date())
    const [data, setData] = useState(null)
    const [population, setPopulation] = useState(null)

    const DayMY = moment(new Date()).format('DD.MM.YYYY');

    useEffect(() => {
        axios.post(`${ip}/api/face/analytics/${active}`, {
            second_date: date
        })
            .then((res) => {
                setData(res.data)
                setPopulation([
                    res.data.age_0_10,
                    res.data.age_11_17,
                    res.data.age_18_25,
                    res.data.age_26_40,
                    res.data.age_41_60,
                    res.data.age_61,
                ])
            })
            .catch(err => {
            })
    }, [date, active])

    useEffect(() => {
        if(!is_refresh_value) {
            return navigate('/face-control-search')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const topData = [
        {
            title: `KIRISH "NAVRUZ BOG'I"`,
            mainPercent: data && data.door_1,
            littlePercent: '0.21%',
            data: data ? data.data && data.data.map(item => item.door_1) : [],
            category: data ? data.data && data.data.map(item => item.part): [],
            color: "#11d2c2"
        },
        {
            title: `KIRISH "MAKRO"`,
            mainPercent: data && data.door_2,
            littlePercent: '0.21%',
            data: data ? data.data && data.data.map(item => item.door_2): [],
            category: data ? data.data && data.data.map(item => item.part): [],
            color: "#29B85D"
        },
        {
            title: `KIRISH "AVTOTURARGOH"`,
            mainPercent: data && data.door_3,
            littlePercent: '0.21%',
            data: data ? data.data && data.data.map(item => item.door_3) : [],
            category: data ? data.data && data.data.map(item => item.part) : [],
            color: "#000"
        },
        {
            title: `KIRISH "EFENDI"`,
            mainPercent: data && data.door_4,
            littlePercent: '0.21%',
            data: data ? data.data && data.data.map(item => item.door_4) : [],
            category: data ? data.data && data.data.map(item => item.part) : [],
            color: "#B12929"
        },
        {
            title: `KIRISH "OLIMPIYA MUZEYI"`,
            mainPercent: data && data.door_5,
            littlePercent: '0.21%',
            data: data ? data.data && data.data.map(item => item.door_5) : [],
            category: data ? data.data && data.data.map(item => item.part) : [],
            color: "#0a38c1"
        }
    ]


    const breakPoints = [
        {width:1, itemsToShow: 1},
        {width:500, itemsToShow: 2},
        {width:768, itemsToShow: 3},
        {width:1100, itemsToShow: 3},
        {width:1500, itemsToShow: 4},
    ];

    return (
        <div className='analysis-container'>
            <div className="analysis_header">
                <div style={{marginRight: '20px'}} className="content_top">
                    <p  className="Content_title">Statistika</p>
                </div>
                <div className='anaylsis-button-group'>
                    <DatePicker placeholder={DayMY} onChange = {value => setDate(value)} style = {{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}} />
                    <button onClick={() => setActive('daily')} className={`${active === 'daily' ? 'analysis-active-button' : null}`}>Day</button>
                    <button onClick={() => setActive('week')} className={`${active === 'week' ? 'analysis-active-button' : null}`}>Week</button>
                    <button onClick={() => setActive('month')} className={`${active === 'month' ? 'analysis-active-button' : null}`}>Month</button>
                    <button onClick={() => setActive('year')} className={`${active === 'year' ? 'analysis-active-button' : null}`}>Year</button>
                </div>
            </div>

                <div className='analysis-top'>
                    <Carousel breakPoints={breakPoints} renderArrow={myArrow}>
                    {
                        topData.map((item, index) => (
                                <div key = {index} className='analysis-top-item'>

                                    <div className="doors_title">
                                        <h3>{item.title.slice(0, 6)}</h3>
                                        <h2>{item.title.slice(7, 30)}</h2>
                                    </div>

                                    <div className='analysis-top-item-text'>
                                        <p>{item.mainPercent}</p>
                                        <p style={{opacity: 0}}>{item.littlePercent}</p>
                                    </div>
                                    <div>
                                        <MiniChart data = {item} />
                                    </div>
                                </div>
                        ))
                    }
                    </Carousel>
                </div>


            <div className='analysis-body'>
                <div className='analysis-body-text-block'>
                    <h2 className='analysis-body-title'>Umumiy ma'lumot beruvchi diagramma</h2>
                    <p>Jami odamlar soni: <i>{ data ? data.human_count : 0}</i></p>
                </div>
                <div className='analysis-body-chart-block'>
                    <BodyChart data = {data} />
                </div>
            </div>
            <div className='analysis-footer'>
                <div className='analysis-footer-left'>
                    <h2 className='analysis-footer-title' style={{marginBottom: '20px'}}>Yosh bo'yicha ko'rsatkichlar</h2>
                    <PieChart data = {population} />
                </div>
                <div className='analysis-footer-right'>
                    <div className="gender_top">
                        <h2>Jins bo'yicha ko'rsatkichlar</h2>
                        {/*<div className="man_woman">*/}
                        {/*    <p>Erkaklar</p>*/}
                        {/*    <p>Ayollar</p>*/}
                        {/*</div>*/}
                    </div>
                     <LineChart data = {data} />
                </div>
            </div>
        </div>
    )
}

export default FaceControlAnalysis
