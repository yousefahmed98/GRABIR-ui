import React from 'react'
import { Modal , Button } from 'react-bootstrap'
import Formm from './Form';
import "./profile.css";

function MyVerticallyCenteredModal(props) {
    return (
        <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-box">
          <Modal.Title id="contained-modal-title-vcenter" >
            Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Formm />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className="btn-add" href="/myprofile">Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
 export default function Edit() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button onClick={() => setModalShow(true)} className="btn-add" >
          Edit your information
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  

  

  