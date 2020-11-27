import react, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark,faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';


import NoteService from '../../services/noteService';


export default function NoteCard({note:inputNote}){
    const [note,setNote] = useState(inputNote);
    const tags = (!note.tags)? [] : note.tags.map(tag => '#'+tag).join(' ');
    const valueChanged = (value,id) => {
        if(id==='tags'){
            console.log(value);
            value = value.split(' ')
            .map(tag => {
                console.log(tag)
                if(tag === '') return ' '
                tag = tag.replace('#','');
                tag = tag.replace(' ','');
                tag = tag.replace('-','');
                tag = tag.toLowerCase();
                return tag;
            })
            .filter(tag => tag.length > 0)
            console.log(value);
        }
        const newNote = {...note};
        newNote[id] = value;
        setNote(newNote);
    }

    const saveNote = () => {
        console.log('saveNote');
        const noteservice = new NoteService();
        note.tags = note.tags.filter(tag => tag !==' ');
        noteservice.saveNote(note)
    }

    return(
        <Card style={{margin:'5px 0px'}} className="noteCard" >
        <Card.Header>
        
        <div className="row">
            <div className="col-11"> 
                <input type='text' 
                    value={note.name} 
                    className={'textInput'}
                    onChange={(e)=>valueChanged(e.target.value,'name')}
                    onBlur={()=>saveNote()}
                />
            </div>
            <div className="col-1">
                {/* <div className='btn'>
                    <FontAwesomeIcon icon={faPencilAlt}  className="text-secondary icon" />
                </div> */}
                <div className='btn'>
                    <FontAwesomeIcon icon={faBookmark}  className="text-primary icon" />
                </div>
            </div>
        </div>
            
           

        </Card.Header>
        <Card.Body>
            <blockquote className="blockquote mb-0">
            <p>
                <TextareaAutosize  
                    value={note.text} 
                    className={'textInput'}
                    onChange={(e)=>valueChanged(e.target.value,'text')}
                    onBlur={()=>saveNote()}
                />
                
            </p>
            <footer className="">
                <input type='text' 
                    value={tags} 
                    className={'textInput tags'}
                    onChange={(e)=>valueChanged(e.target.value,'tags')}
                    onBlur={()=>saveNote()}
                />
            </footer>
            </blockquote>
        </Card.Body>
        </Card>
    )
}


