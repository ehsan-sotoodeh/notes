import react,{useEffect, useState} from 'react';


import './main.css'
import CardsList from './CardsList'
import SearchBar from './SearchBar'
import NoteService from '../../services/noteService';

export default function  MainPage(){

    const [notes,setNotes] = useState([]);
    useEffect(async () => {
        const noteService = new NoteService();
        const fetchData = async () => {
            const result =  await noteService.getNotes();
            setNotes(result.data);
        }
        fetchData();
      },[]);


    const removeOneById = (id)=>{
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    }

    return (
        <div style={{marginTop:'20px'}}>
            <SearchBar notes={notes} setNotes={setNotes}></SearchBar>
            <CardsList notes={notes} removeOneById={removeOneById} ></CardsList>
        </div>
    )
}