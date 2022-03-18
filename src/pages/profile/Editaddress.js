import React from 'react'
import { Form, Button, Col} from 'react-bootstrap'


export default function Editaddress() {
  return (
    <>
    <Form>

            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <hr />

        <Button variant="primary" type="submit" className="btn-add">
            Save
        </Button>
        </Form>
    </>
  )
}
