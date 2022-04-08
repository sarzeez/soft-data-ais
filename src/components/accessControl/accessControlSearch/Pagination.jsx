import {Pagination} from 'antd';

const AccessControlSearchPagination = (props) => {

    const {
        accessTablePaginationLimit,
        accessTablePaginationCurrent,
        accessTablePaginationOnChange,
        accessTableTotal
    } = props;

    return <Pagination
        dropdownRender = {false}
        defaultPageSize = {accessTablePaginationLimit}
        current={accessTablePaginationCurrent}
        onChange={accessTablePaginationOnChange}
        total = {accessTableTotal}
        showSizeChanger={true}
        pageSize={accessTablePaginationLimit}
        pageSizeOptions={[15, 30, 50, 100]}
    />;
}

export default AccessControlSearchPagination