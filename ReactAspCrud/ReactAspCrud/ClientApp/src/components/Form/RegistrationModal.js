import React, { Component, Fragment, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import RegistrationForm from './RegistrationForm';

function RegistrationModal(props){
    // Declare statefull variables for this function
    const [modal, setModal] = useState(false);

    // Method to toggle modal on/off
    function toggle() {
        setModal(!modal);
    }

    // Evaluate style of submit button
    let title = 'Edit User';
    let button = '';
    if (props.isNew){
        title = 'Add User';
        button = <Button
            color="success"
            onClick={toggle}
            style={{ minWidth: "200px" }}
            >
                Add
            </Button>
    } else {
        button = <Button
            color="warning"
            onClick={toggle}
            >
                Edit
            </Button>
    }

    // Return rendering for registrationmodal
    return(
        <Fragment>
            {button}
            <Modal isOpen={modal} toggle={toggle} className={props.className}>
                <ModalHeader toggle={toggle}>
                    {title}
                </ModalHeader>
                <ModalBody>
                    <RegistrationForm
                        addUserToState={props.addUserToState}
                        updateUserIntoState={props.updateUserIntoState}
                        toggle={toggle}
                        user={props.user}/>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}
export default RegistrationModal;
