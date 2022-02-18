import React from 'react'
import '../analysis.css';
import ReactApexChart from 'react-apexcharts'
import {useTranslation} from "react-i18next";

const ApexChart = (props) => {

    const {t} = useTranslation()
    const {data} = props;
    const state = {
        series: data,
        options: {
            chart: {
                type: 'donut',
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                label: t('Jami'),
                                showAlways: true,
                                show: true
                            }
                        }
                    }
                }
            },
            labels: [`Yosh bolalar`, `O'smirlar`, `O'spirinlar`, `O'rta yoshdagilar`, `Katta yoshdagilar`, `Keksalar`],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            colors: ["#A461D8", "#FFC107", "#FF6B72", "#04D182", "#3E82F7", "#F07427"]
        },
    };

    return (
        <div id="chart circle_chart" className="circle_chart">
            {
                data &&
                <ReactApexChart options={state.options} series={state.series} type="donut" height={300}/>
            }

            <div className="pieChart_title">
                <div className="chart_title">
                    <div className="title_round" style={{background: '#A461D8'}}></div>
                    <p> {t("Yosh bolalar")} (0-10) - </p> <b> {data && data[0]}</b></div>
                <div className="chart_title">
                    <div className="title_round" style={{background: '#FFC107'}}></div>
                    <p>{t("O'smirlar")} (11-17) - </p>  <b> {data && data[1]}</b></div>
                <div className="chart_title">
                    <div className="title_round"  style={{background: '#FF6B72'}}></div>
                    <p>{t("O'spirinlar")} (18-25) - </p>  <b> {data && data[2]}</b></div>
                <div className="chart_title" >
                    <div className="title_round" style={{background: '#04D182'}}></div>
                    <p>{t("O'rta yoshdagilar")} (26-40) - </p><b> {data && data[3]}</b>
                </div>
                <div className="chart_title" >
                    <div className="title_round" style={{background: '#3E82F7'}}></div>
                    <p>{t("Katta yoshdagilar")} (41-60) - </p> <b> {data && data[4]}</b>
                </div>
                <div className="chart_title" >
                    <div className="title_round" style={{background: '#F07427'}}></div>
                    <p>{t("Keksalar")} (61 dan...) - </p> <b> {data && data[5]}</b>
                </div>

            </div>

        </div>
    );
}

export default ApexChart