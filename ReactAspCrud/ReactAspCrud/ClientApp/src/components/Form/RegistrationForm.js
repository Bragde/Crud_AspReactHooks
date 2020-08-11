import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import useInput from '../useInput'

function RegistrationForm(props) {
    // Declaration of statefull variables for this function
    const [id, setId] = useInput(props.user ? props.user.id : 0);
    const [name, setName] = useInput(props.user ? props.user.name : '');
    const [document, setDocument] = useInput(props.user ? props.user.document : '');
    const [email, setEmail] = useInput(props.user ? props.user.email : '');
    const [phone, setPhone] = useInput(props.user ? props.user.phone : '');

    // Method to submit a new user
    function submitNew(e) {
        e.preventDefault();
        fetch(`${USERS_API_URL}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(user)
            body: JSON.stringify({
                name: name,
                document: document,
                email: email,
                phone: phone
            })
        })
        .then(response => response.json())
        .then(user => {
            props.addUserToState(user);
            props.toggle();
        })
        .catch(err => console.log(err));
    }

    // Method to edit existing user
    function submitEdit(e) {
        e.preventDefault();
        fetch(`${USERS_API_URL}/${id}`,{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                name: name,
                document: document,
                email: email,
                phone: phone
            })
        })
        .then(() => {
            props.toggle();
            props.updateUserIntoState(id);
        })
        .catch(err => console.log(err));
    }

    return (
        <Form onSubmit={props.user ? submitEdit : submitNew}>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type='text' name='name' onChange={setName} value={name}/>
            </FormGroup>
            <FormGroup>
                <Label for="document">Document</Label>
                <Input type='text' name='document' onChange={setDocument} value={document}/>
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type='text' name='email' onChange={setEmail} value={email}/>
            </FormGroup>
            <FormGroup>
                <Label for="phone">Phone</Label>
                <Input type='text' name='phone' onChange={setPhone} value={phone}/>
            </FormGroup>
            <Button>Send</Button>
        </Form>
    );
}
export default RegistrationForm;