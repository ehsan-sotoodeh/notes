import react from 'react'
import { Form,Col } from 'react-bootstrap';

export default function SearchBar(){
    return (
        <Form.Row>
        <Form.Group as={Col} xs={10} controlId="formGridCity">
          <Form.Control 
            placeholder="Seach"
          />
        </Form.Group>
    
        <Form.Group as={Col} xs={2} controlId="formGridState">
          <Form.Control as="select" defaultValue="Choose...">
            <option>Everything</option>
            <option>Name</option>
            <option>Text</option>
            <option>Tags</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    )
}