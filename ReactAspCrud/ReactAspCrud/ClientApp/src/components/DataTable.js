import React, { Component } from 'react';
import { Table,Button } from 'reactstrap';
import RegistrationModal from './Form/RegistrationModal';
import { USERS_API_URL } from '../constants';

function DataTable (props) {

    // Method to delete item
    function deleteItem(id) {
        let confirmDeletion = window.confirm('Do you really wish to delete it?');
        if(confirmDeletion){
            fetch(`${USERS_API_URL}/${id}`,{
                method: 'delete',
                headers: {'ContentType': 'application/json'}
            })
            .then(response => { props.deleteItemFromState(id)})
            .catch(err => console.log(err));
        }
    }

    return(
        <Table striped>
            <thead className="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Document</th>
                    <th>Phone</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {!props.items || props.items.length <= 0 ?
                    <tr>
                        <td colSpan="6" align="center"><b>No users yet</b></td>
                    </tr>
                : props.items.map(item => (
                    <tr key={item.id}>
                        <th scope="row">
                            {item.id}
                        </th>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.email}
                        </td>
                        <td>
                            {item.document}
                        </td>
                        <td>
                            {item.phone}
                        </td>
                        <td align="center">
                            <div>
                                <RegistrationModal
                                    isNew={false}
                                    user={item}
                                    updateUserIntoState={props.updateState}/>
                                &nbsp;&nbsp;&nbsp;
                                <Button color="danger" onClick={() => deleteItem(item.id)}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
export default DataTable;