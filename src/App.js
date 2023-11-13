import { useState, useEffect } from "react";

import {
  Container,
  Navbar,
  Button,
  Form,
  Table,
  Col,
  Row,
  Alert,
} from "react-bootstrap";

import "./App.css";
import api from "./Api";
import Auth from './Auth';

function App() {
  const [statusMessage, setStatusMessage] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userInterests, setUserInterests] = useState("");
  const [allUserData, setAllUserData] = useState([]);
  const [currentUser] = useState(Auth.currentUser().emails[0]);

  useEffect(
    function () {
      function getUserData() {
        api({
          method: "get",
          url: `/GetData?email=${currentUser}`,
          headers: { Authorization: Auth.getToken() }
        })
          .then((response) => {
            if (response.data[0]) {
              setUserLocation(response.data[0].location);
              setUserInterests(response.data[0].interests);
              setStatusMessage("Data about the logged in user recevied successfully .");
            }
          })
          .catch((error) => {
            setStatusMessage("Error getting data about logged in user.");
          });
      }

      console.log("Enter getUserData().................currentUser=" + currentUser);

      getUserData();
    },
    [currentUser]
  );

  function saveUserData() {
    api({
      method: "put",
      url: `/SaveData?email=${currentUser}`,
      data: {
        location: userLocation,
        interests: userInterests,
      },
      headers: { Authorization: Auth.getToken() }
    })
      .then((response) => {
        setStatusMessage("Data about the user saved successfully.");
      })
      .catch((error) => {
        console.log(error);
        setStatusMessage("Error saving data about the user.");
      });
  }

  function deleteUserData() {
    api({
      method: "delete",
      url: `/DeleteData?email=${currentUser}`,
      headers: { Authorization: Auth.getToken() }
    })
      .then((response) => {
        setUserLocation("");
        setUserInterests("");
        setStatusMessage("Data about the user deleted successfully.");
      })
      .catch((error) => {
        setStatusMessage("Error deleting data about the user.");
      });
  }

  function getAllUserData() {
    api({
      method: "get",
      url: "/GetAllData",
      headers: { Authorization: Auth.getToken() }
    })
      .then((response) => {
        setAllUserData(response.data);
        setStatusMessage("Data about all users received successfully.");
      })
      .catch((error) => {
        setStatusMessage("Error getting data about logged in user.");
      })
  };

  return (
    <Container>
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand>My Profile</Navbar.Brand>

        <Navbar.Text>Signed in as: {currentUser}</Navbar.Text>
      </Navbar>

      <Form className="box">
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              readOnly
              defaultValue={currentUser}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Location
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Enter your location"
              value={userLocation || ""}
              onChange={(event) => {
                setUserLocation(event.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Interests
          </Form.Label>
          <Col sm="10">
            <Form.Control
              placeholder="Enter your interests"
              value={userInterests || ""}
              onChange={(event) => {
                setUserInterests(event.target.value);
              }}
            />
          </Col>
        </Form.Group>
        <div className="buttonContainer">
          <Button
            variant="primary"
            className="buttonGap"
            onClick={() => saveUserData()}
          >
            Save Data
          </Button>
          <Button
            variant="danger"
            className="buttonGap"
            onClick={() => deleteUserData()}
          >
            Delete My Data
          </Button>
          <Button variant="info" onClick={() => Auth.logout()}>Sign Out</Button>
        </div>
      </Form>

      <Alert variant="info">Status: {statusMessage}</Alert>

      <div className="box boxGap">
        <div className="buttonContainer">
          <Button variant="success" onClick={() => getAllUserData()}>
            Get All Data
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>User</th>
              <th>Interests</th>
            </tr>
          </thead>
          <tbody>
            {allUserData.map((listValue, index) => {
              return (
                <tr key={index}>
                  <td>{listValue.email}</td>
                  <td>{listValue.interests}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default App;
