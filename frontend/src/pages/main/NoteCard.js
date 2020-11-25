import react from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark,faPencilAlt } from '@fortawesome/free-solid-svg-icons'


export default function NoteCard({note}){
    const tags = note.tags.map(tag => {
        return(
            <span className='tag'>
                #{tag}
            </span>
        )
    })
    return(
        <Card style={{margin:'5px 0px'}} className="noteCard">
        <Card.Header>
            
        <div className="d-flex">
            <div className="mt-1"> {note.name}</div>
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
                {note.text}
                {' '}
            </p>
            <footer className="blockquote-footer">
                {tags}
            </footer>
            </blockquote>
        </Card.Body>
        </Card>
    )
}