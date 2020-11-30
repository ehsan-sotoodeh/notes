import react, { useState } from 'react'
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark,faTrashAlt,faCalendar } from '@fortawesome/free-solid-svg-icons'
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment';

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
        if((note?.tags.length === 0) && (!note.title) && (!note.text)){
            return;
        }
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

    const createdAt = new moment(new Date(note.createdAt)).format('llll');
    
    return(
        <div style={{margin:'5px 0px'}} className="noteCard" >
        <div>
        <div className="d-flex" >
            <span className="">
                    <span className="f12">
                        <FontAwesomeIcon icon={faCalendar}  className="text-secondary f09 mr-2" />
                    </span>
                    <span className="date"> { createdAt }</span>
                </span>
        </div>
        <div className="row">
            <div className="col-11"> 
                <input type='text' 
                    placeholder="Title..."
                    value={note.name} 
                    className={'textInput noteTitle mb-0 '}
                    onChange={(e)=>valueChanged(e.target.value,'name')}
                    onBlur={()=>saveNote()}
                />
                <input type='text' 
                    placeholder="Tags.."
                    value={tags} 
                    className={'textInput tags'}
                    onChange={(e)=>valueChanged(e.target.value,'tags')}
                    onBlur={()=>saveNote()}
                />


            </div>
            <div className="col-1">
                {/* <div className='btn'>
                    <FontAwesomeIcon icon={faPencilAlt}  className="text-secondary icon" />
                </div> */}
                <div className="row pr-2">
                    {/* <div className='btn col-6'>
                        <FontAwesomeIcon icon={faBookmark}  className="text-primary icon" />
                    </div> */}
                    <div className='btn col-6' onClick={()=>promptDelete()}>
                        <FontAwesomeIcon icon={faTrashAlt}  className="text-danger icon" />
                    </div>
                </div>
            </div>

        </div>

           

        </div>
        <div>
            <blockquote className="blockquote mb-0">
            <hr style={{margin:'2px'}}/>
            <p>
                <TextareaAutosize  
                    style={{backgroundColor:'#00000000'}}
                    value={note.text} 
                    className={'textInput textarea '}
                    onChange={(e)=>valueChanged(e.target.value,'text')}
                    onBlur={()=>saveNote()}
                    placeholder="Content..."

                />
                
            </p>
            </blockquote>
            <SimpleModal 
                show={showDeleteModal}
                handleClose={handleDeleteModalClose}
                message={'Are you sure you want to delete:'}
                itemName = {note.name }
                action = {'Delete'}
                buttonVariant = {'danger'}
                />
        </div>
        <div className="blockEnd">
            <center>
                -------------------------------------
            </center>
        </div>

        </div>
    )
}


