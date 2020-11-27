import react from 'react'
import { Form,Col, Button,Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import NoteCard from './NoteCard';


export default function SearchBar({notes,setNotes}){


    const createNewCard = () => {
        const newNote = {
            name : '',
            text : '',
            tags : [],
            createdAt : new Date(),
        }
        setNotes([newNote,...notes]);
    }
    return (
        <Form.Row>
        <Form.Group as={Col} xs={9} controlId="formGridCity">
          <Form.Control 
            placeholder="Seach"
          />
        </Form.Group>
    
        <Form.Group as={Col} xs={2} controlId="formGridState">
            <div className="">
                <Form.Control  className="ml-auto" as="select" defaultValue="Choose...">
                    <option>Everything</option>
                    <option>Name</option>
                    <option>Text</option>
                    <option>Tags</option>
                </Form.Control>
            </div>
        </Form.Group>
        <Form.Group as={Col} xs={1} controlId="formGridState">
                <Button  className="" variant="success" size={'md'} onClick={()=>createNewCard()}>
                    <FontAwesomeIcon icon={faPlus}  className="text-light icon" />
                </Button>
        </Form.Group>


      </Form.Row>
    )
}