import react,{useEffect, useState} from 'react';
import NoteCard from './NoteCard';
import {Pagination} from 'react-bootstrap';

import NoteService from '../../services/noteService';

export default function CardsList(){
    const [notes,setNotes] = useState([]);
    let active = 1;

    const paginationItems = [];
    for (let number = 1; number <= 5; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }

    useEffect(async () => {
        const noteService = new NoteService();
        const fetchData = async () => {
            const result =  await noteService.getNotes();
            setNotes(result.data);
        }
        fetchData();
      },[]);
    
    const noteCards = notes.map(note => {

        return (<NoteCard note={note} />);
    })


    return(
        <div>
            {noteCards}
            <Pagination>{paginationItems}</Pagination>
        </div>
    )
}