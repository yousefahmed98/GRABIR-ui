import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Picture from "./Picture";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  const [data, setData] = useState(null);
  
  const changedata = (a) => {
    if (a.target.name === "pic") {
      setData(a.target.files[0]);
    }
  };

const submitPic = (a) => {
  a.preventDefault();
  const formData = new FormData();
  const imagefile = data
  formData.append("ProfilePic", imagefile);
  axios.patch(
    `http://127.0.0.1:8000/base/users/${localStorage.getItem("id")}/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )
  .then((res) => {
    localStorage.removeItem("ProfilePic")
    localStorage.setItem("ProfilePic", res.data.ProfilePic)
    window.alert("Profile Picture updated succefully")
  })
}
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-box">
          <Modal.Title id="contained-modal-title-vcenter">Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={ (a) => submitPic(a)}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="file"
              name="pic"
              onChange={(a) => changedata(a)}
            />
            <Button  onClick={props.onSave} className="btn-add mt-2" type="submit">
              Save
            </Button>
          </Form.Group>
          </Form>
          <Picture data={data} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} href="/myprofile" className="btn-add">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function Btnpic() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button onClick={() => setModalShow(true)} className="btn-add">
        Edit Picture
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
