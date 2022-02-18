import React from 'react'

import ReactApexChart from 'react-apexcharts'
import {useTranslation} from "react-i18next";

const LineChart = (props) => {
    const {t} = useTranslation()
    const { data }=props;

    const state = {
        series: [
            {
                name: t('Erkaklar'),
                data: data ? data.data && data.data.map(item => item.male_count) : []
            },
            {
                name: t('Ayollar'),
                data: data ? data.data && data.data.map(item => item.female_count) : []
            }
        ],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false
                },
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 4,
                colors: undefined,
                strokeColors: '#fff',
                strokeWidth: 2,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                shape: "circle",
                radius: 2,
                offsetX: 0,
                offsetY: 0,
                onClick: undefined,
                onDblClick: undefined,
                showNullDataPoints: true,
                hover: {
                    size: undefined,
                    sizeOffset: 3
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            xaxis: {
                type: 'number',
                categories: data ? data.data && data.data.map(item => item.part) : []
            },
            tooltip: {
                x: {
                    format: 'YY/MM/yy, HH:mm:ss'
                },
            },
            colors: ["#3E82F7", "#CC74B9"]
        },
    }


    return (
        <div id="chart">
            {
                data && data.data &&
                <ReactApexChart options={state.options} series={state.series} type="line" height={450} />
            }
        </div>
    )
}

export default LineChart