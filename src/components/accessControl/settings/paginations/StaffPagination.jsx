import {Pagination} from 'antd';

const StaffPagination = (props) => {

    const {
        staffPaginationLimit,
        staffPaginationCurrent,
        staffPaginationOnChange,
        accessTableTotal,

    } = props;

    return <Pagination
        dropdownRender = {false}
        defaultPageSize = {staffPaginationLimit}
        current={staffPaginationCurrent}
        onChange={staffPaginationOnChange}
        total = {accessTableTotal}
        showSizeChanger={true}
        pageSize={staffPaginationLimit}
        pageSizeOptions={[14, 50, 100]}
    />;
}

export default StaffPagination