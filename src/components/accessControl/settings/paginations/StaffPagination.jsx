import {Pagination} from 'antd';

const StaffPagination = (props) => {

    const {accessTablePaginationLimit, accessTablePaginationCurrent, accessTablePaginationOnChange, accessTableTotal} = props;

    return <Pagination
        dropdownRender = {false}
        defaultPageSize = {accessTablePaginationLimit}
        current={accessTablePaginationCurrent}
        onChange={accessTablePaginationOnChange}
        total = {accessTableTotal}
        showSizeChanger={true}
        pageSize={accessTablePaginationLimit}
        pageSizeOptions={[15, 30, 60, 90]}
    />;
}

export default StaffPagination