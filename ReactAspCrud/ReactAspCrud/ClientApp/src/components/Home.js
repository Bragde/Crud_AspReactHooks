import React, { Component, useState, useEffect } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DataTable from './DataTable';
import RegistrationModal from './Form/RegistrationModal';
import { USERS_API_URL } from '../constants';

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => { getItems(); })

  function getItems() {
    fetch(USERS_API_URL)
      .then(res => res.json())
      .then(res => setItems(res))
      .catch(err => console.log(err));
  }

  function addUserToState(user) {
    setItems(items.concat(user));
  }

  function updateState(id) {
    getItems();
  }

  function deleteItemFromState(id) {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
  }

  return (
    <Container style={{ paddingTop: "100px" }}>
      <Row>
        <Col>
          <h3>React + ASP.NET CRUD</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataTable
            items={items}
            updateState={updateState}
            deleteItemFromState={deleteItemFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <RegistrationModal
            isNew={true}
            addUserToState={addUserToState} />
        </Col>
      </Row>
    </Container>
  )
}
export default Home;