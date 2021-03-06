import {Pagination} from 'antd';

const FaceControlPagination = (props) => {

    const {accessTablePaginationLimit, accessTablePaginationCurrent, accessTablePaginationOnChange, accessTableTotal} = props;

    return <Pagination
        dropdownRender = {false}
        defaultPageSize = {accessTablePaginationLimit}
        current={accessTablePaginationCurrent}
        onChange={accessTablePaginationOnChange}
        total = {accessTableTotal}
        showSizeChanger={true}
        pageSize={accessTablePaginationLimit}
        pageSizeOptions={[24, 36, 48, 60]}
    />;
}

export default FaceControlPagination