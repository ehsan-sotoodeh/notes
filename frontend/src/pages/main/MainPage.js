import react,{useEffect, useState} from 'react';
import { useAuth0 } from "@auth0/auth0-react";


import './main.css'
import CardsList from './CardsList'
import SearchBar from './SearchBar'
import NoteService from '../../services/noteService';

export default function  MainPage(){
    const [notes,setNotes] = useState([]);
    const { isAuthenticated,isLoading  } = useAuth0();
    const [searchTerm , setSearchTerm] = useState('');
    const [searchKey , setSearchKey] = useState('name,text,tags');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        const noteService = new NoteService();
        const fetchData = async () => {
            try {
                const result =  await noteService.getNotes(searchTerm,searchKey);
                console.log(result)
                setNotes(result.data);
                
            } catch (error) {
                console.log(error);
                setNotes([]);
            }
        }
        fetchData();
      },[isAuthenticated,isLoading,searchTerm,searchKey]);


    const removeOneById = (id)=>{
        const newNotes = notes.filter(note => note._id !== id);
        setNotes(newNotes);
    }

    return (
        <div style={{marginTop:'20px'}}>
            <SearchBar notes={notes} setNotes={setNotes}
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            searchKey={searchKey} setSearchKey={setSearchKey}
            ></SearchBar>
            <CardsList notes={notes} removeOneById={removeOneById} ></CardsList>
        </div>
    )
}