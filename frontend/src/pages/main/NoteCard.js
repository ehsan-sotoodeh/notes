import react from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark,faPencilAlt } from '@fortawesome/free-solid-svg-icons'


export default function NoteCard(){
    return(
        <Card style={{margin:'5px 0px'}} className="noteCard">
        <Card.Header>
            
        <div className="d-flex">
            <div className="mt-1"> Note title Plus a Lorem Ipsum to make it longer</div>
            <div className="ml-auto">
                <div className='btn'>
                    <FontAwesomeIcon icon={faPencilAlt}  className="text-secondary icon" />
                </div>
                <div className='btn'>
                    <FontAwesomeIcon icon={faBookmark}  className="text-primary icon" />
                </div>
            </div>
        </div>
            
           

        </Card.Header>
        <Card.Body>
            <blockquote className="blockquote mb-0">
            <p>
                {' '}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
                erat a ante.{' '}
            </p>
            <footer className="blockquote-footer">
                #tag1 #tag2 #some_other_tag #new_tag #other
            </footer>
            </blockquote>
        </Card.Body>
        </Card>
    )
}