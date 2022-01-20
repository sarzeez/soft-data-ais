import {Pagination} from 'antd';
import {useState} from 'react';

const Pag = ({handleGetFilter, total, limit}) => {
    const [current, setCurrent] = useState(1)
    const tt = Math.ceil(total)

    const onChange = page => {
        setCurrent(page)
        handleGetFilter(page)
    };

    return <Pagination
        current={current}
        defaultPageSize = {limit}
        onChange={onChange}
        total={tt}
        showSizeChanger={true}
        dropdownRender = {false}
    />;
}

export default Pag