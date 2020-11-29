import react, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark,faTrashAlt,faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';


import NoteService from '../../services/noteService';
import SimpleModal from '../../common/SimpleModal'

export default function NoteCard({note:inputNote,removeOneById}){
    const [note,setNote] = useState(inputNote);
    const [showDeleteModal,setShowDeleteModal] = useState(false);
    const tags = (!note.tags)? [] : note.tags.map(tag => '#'+tag).join(' ');
    const noteservice = new NoteService();

    const valueChanged = (value,id) => {
        if(id==='tags'){
            value = value.split(' ')
            .map(tag => {
                if(tag === '') return ' '
                tag = tag.replace('#','');
                tag = tag.replace(' ','');
                tag = tag.replace('-','');
                tag = tag.toLowerCase();
                return tag;
            })
            .filter(tag => tag.length > 0)
        }
        const newNote = {...note};
        newNote[id] = value;
        setNote(newNote);
    }

    const saveNote = async () => {
        note.tags = note.tags.filter(tag => tag !==' ');
        const savedNote = await noteservice.saveNote(note);
        setNote(savedNote.data);
    }

    const promptDelete = ()=>{
        setShowDeleteModal(true);
    }



    const handleDeleteModalClose = async (action) =>{
        setShowDeleteModal(false);
        if(action === 'Delete'){
            const res = await noteservice.deleteNote(note);
            if(res.status === 200){
                removeOneById(note._id);
            }

        }


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
                <div className="row pr-2">
                    <div className='btn col-6'>
                        <FontAwesomeIcon icon={faBookmark}  className="text-primary icon" />
                    </div>
                    <div className='btn col-6' onClick={()=>promptDelete()}>
                        <FontAwesomeIcon icon={faTrashAlt}  className="text-danger icon" />
                    </div>

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
            <SimpleModal 
                show={showDeleteModal}
                handleClose={handleDeleteModalClose}
                message={'Are you sure you want to delete:'}
                itemName = {note.name }
                action = {'Delete'}
                buttonVariant = {'danger'}
                />
        </Card.Body>
        </Card>
    )
}


