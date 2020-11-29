import axios from 'axios'

const NotesAPI = process.env.REACT_APP_API_URL + '/notes'

export default class NoteService {
    getNotes = async () => {
        return  await axios(NotesAPI,{ 
            params:{
                searchKey:'text',
                sortBy:'createdAt',
                sortDirection:-1,
                page:1,
                limi:5
            },
            headers: {"Access-Control-Allow-Origin": "*"}
        });
    }

    saveNote = async (note) =>{
        if(note._id){
            return this.updateNote(note);
        }
        return this.addNewNote(note);
    }

    updateNote = async (note) =>{
        console.log(note)
        const res = await axios.put(NotesAPI+'/'+note._id,{ 
            params:{
                name:note.name,
                text:note.text,
                tags:note.tags
            },
            headers: {"Access-Control-Allow-Origin": "*"}
        });
        return res;
    }
    addNewNote = async (note) =>{
        if(!note.name.length && !note.text.length){
            return;
        }
        const res = await axios.post(NotesAPI,{ 
            params:{
                name:note.name,
                text:note.text,
                tags:note.tags
            },
            headers: {"Access-Control-Allow-Origin": "*"}
        });
        return res
    }
    deleteNote = async (note) =>{
        const res = await axios.delete(NotesAPI+'/'+note._id,{ 
            headers: {"Access-Control-Allow-Origin": "*"}
        });
        return res
    }


}