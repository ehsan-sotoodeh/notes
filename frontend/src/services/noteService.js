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
}