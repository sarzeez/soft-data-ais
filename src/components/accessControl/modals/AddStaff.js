import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function AddStaff(props) {

    const { isOpenAddStaff, setIsOpenAddStaff  } = props;

    return (
        <Modal
            isOpen={isOpenAddStaff}
            onRequestClose={() => setIsOpenAddStaff(false)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={300}
        >
            <div className="access_control_add_staff_modal">
                <h1>This is a staff modal</h1>
            </div>
        </Modal>
    );
}

export default AddStaff