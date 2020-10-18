import React, {Fragment} from 'react';
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button } from "react-bootstrap";

const AddProduct = () => {
    return (
        <Fragment>
            <h2>Add New Book</h2>
            <Form>
                <Form.Group>
                    <Form.Label className="col-sm-2 col-form-label">Book Title</Form.Label>
                    <Form.Control type="text" placeholder="Entry Book Titke" />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="col-sm-2 col-form-label">Author</Form.Label>
                    <Form.Control type="text" placeholder="Author" />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="col-sm-2 col-form-label">Price</Form.Label>
                    <Form.Control type="integer" placeholder="Price Book" />
                </Form.Group>

                <Form.Group>
                    <Form.Label className="col-sm-2 col-form-label">Description</Form.Label>
                    <Form.Control type="text" placeholder="Book's Description" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Choose the Category</Form.Label>
                        <Form.Control as="select">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="File Input Book Image" />
                </Form.Group>
                <LinkContainer to={`/admin/setProduct"`} style={{ cursor: "pointer" }}>
                    <Button variant="primary" type="submit">Save</Button>
                </LinkContainer>
        </Form>
    </Fragment>
    )
}

export default AddProduct

