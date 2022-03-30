import {Pagination} from 'antd';

const StaffPagination = (props) => {

    const {
        staffPaginationLimit,
        staffPaginationCurrent,
        accessTablePaginationOnChange,
        accessTableTotal,

    } = props;

    return <Pagination
        dropdownRender = {false}
        defaultPageSize = {staffPaginationLimit}
        current={staffPaginationCurrent}
        onChange={accessTablePaginationOnChange}
        total = {accessTableTotal}
        showSizeChanger={true}
        pageSize={staffPaginationLimit}
        pageSizeOptions={[15, 50, 100]}
    />;
}

export default StaffPagination