import {Pagination} from 'antd';

const TerminalPagination = (props) => {

    const {faceTablePaginationLimit, faceTablePaginationCurrent, faceTablePaginationOnChange, faceTableTotal} = props;

    return <Pagination
        dropdownRender = {false}
        defaultPageSize = {faceTablePaginationLimit}
        current={faceTablePaginationCurrent}
        onChange={faceTablePaginationOnChange}
        total = {faceTableTotal}
        showSizeChanger={true}
        pageSize={faceTablePaginationLimit}
        pageSizeOptions={[10, 20, 50]}
    />;
}

export default TerminalPagination