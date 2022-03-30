import {Pagination} from 'antd';

const CameraPagenation = (props) => {

    const {
        accessTablePaginationLimit,
        accessTablePaginationCurrent,
        accessTablePaginationOnChange,
        accessTableTotal,

    } = props;

    return <Pagination
        dropdownRender = {false}
        defaultPageSize = {accessTablePaginationLimit}
        current={accessTablePaginationCurrent}
        onChange={accessTablePaginationOnChange}
        total = {accessTableTotal}
        showSizeChanger={true}
        pageSize={accessTablePaginationLimit}
        pageSizeOptions={[1]}
    />;
}

export default CameraPagenation;