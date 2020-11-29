import NoteCard from './NoteCard';
import {Pagination} from 'react-bootstrap';


export default function CardsList({notes,removeOneById}){
    let active = 1;

    const paginationItems = [];
    for (let number = 1; number <= 5; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === active}>
            {number}
            </Pagination.Item>,
        );
    }




    
    const noteCards = notes.map(note => {

        return (<NoteCard note={note} key={note.createdAt} removeOneById={removeOneById} />);
    })


    return(
        <div>
            {noteCards}
            <Pagination>{paginationItems}</Pagination>
        </div>
    )
}