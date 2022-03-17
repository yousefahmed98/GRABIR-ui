import React, {useState} from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import Picture from './Picture';

function MyVerticallyCenteredModal(props) {
    const [data,setData] = useState(null)
    const changedata = (a) => {
        if(a.target.name === "pic"){
                setData (a.target.files[0])
                console.log(data);

        };
    };
    console.log(data);
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

            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label></Form.Label>
                <Form.Control type="file" name="pic" onChange={(a)=> changedata(a)} />
                <Button onClick={props.onSave} className="btn-add">Save</Button>
            </Form.Group>
            <Picture data={data}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className="btn-add">Close</Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
 export default function Btnpic() {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <>
        <Button onClick={() => setModalShow(true)} className="btn-add" >
          Add/Edit Picture
        </Button>
  
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  

  
