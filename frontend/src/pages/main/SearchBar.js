import react from 'react'
import { Form,Col, Button,Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import NoteCard from './NoteCard';


export default function SearchBar({notes,setNotes,setSearchTerm,setSearchKey}){

    let searchTimer = null;
    const searchInputDelay = 1000;

    const createNewCard = () => {
        const newNote = {
            name : '',
            text : '',
            tags : [],
            createdAt : new Date(),
        }
        setNotes([newNote,...notes]);
    }

    const searchInputChanged = (value) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(()=>{
            setSearchTerm(value);
        },searchInputDelay)
    }



    return (
        <Form.Row>
        <Form.Group as={Col} xs={9} controlId="formGridCity">
          <Form.Control 
            placeholder="Seach"
            onChange={(e)=>searchInputChanged(e.target.value)}
          />
        </Form.Group>
    
        <Form.Group as={Col} xs={2} controlId="formGridState">
            <div className="">
                <Form.Control  className="ml-auto" as="select" 
                    defaultValue="Choose..." onChange={(e)=>{setSearchKey(e.target.value)}}>
                    <option value="name,text,tags" >Everything</option>
                    <option value="name" >Name</option>
                    <option value="text" >Text</option>
                    <option value="tags" >Tags</option>
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