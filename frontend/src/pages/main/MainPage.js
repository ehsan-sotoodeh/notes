import react,{useEffect, useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";


import './main.css'
import CardsList from './CardsList'
import SearchBar from './SearchBar'
import NoteService from '../../services/noteService';

export default function  MainPage(){
    const [notes,setNotes] = useState([]);
    const { isAuthenticated,isLoading,getAccessTokenSilently  } = useAuth0();

    useEffect(async () => {
        const noteService = new NoteService();
        const fetchData = async () => {
            const result =  await noteService.getNotes();
            setNotes(result.data);
        }
        fetchData();
      },[isAuthenticated,isLoading]);


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