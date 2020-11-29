import axios from 'axios'

const NotesAPI = process.env.REACT_APP_API_URL + '/notes'
//const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

export default class NoteService {
    getNotes = async (searchTerm,searchKey) => {
        const accessToken = localStorage.getItem('token');
        console.log('searchTerm',searchTerm)
        console.log('searchKey',searchKey)
        return  await axios(NotesAPI,{ 
            params:{
                searchKey:searchKey,
                searchValue: searchTerm,
                sortBy:'createdAt',
                sortDirection:-1,
                page:1,
                limi:5
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${accessToken}`,
            }
        });
    }

    saveNote = async (note) =>{
        if(note._id){
            return this.updateNote(note);
        }
        return this.addNewNote(note);
    }

    updateNote = async (note) =>{
        const accessToken = localStorage.getItem('token');

        const res = await axios.put(NotesAPI+'/'+note._id,{ 
            params:{
                name:note.name,
                text:note.text,
                tags:note.tags
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return res;
    }
    addNewNote = async (note) =>{
        const accessToken = localStorage.getItem('token');

        if(!note.name.length && !note.text.length){
            return;
        }
        const res = await axios.post(NotesAPI,{ 
            params:{
                name:note.name,
                text:note.text,
                tags:note.tags
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return res
    }
    deleteNote = async (note) =>{
        const accessToken = localStorage.getItem('token');

        const res = await axios.delete(NotesAPI+'/'+note._id,{ 
            headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return res
    }


}