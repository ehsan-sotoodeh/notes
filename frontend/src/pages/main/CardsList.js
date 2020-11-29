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




    const noteCards = (notes.length)?
                        notes.map(note => {
                            return (<NoteCard note={note} key={note.createdAt} removeOneById={removeOneById} />);
                        }):
                        <p className="h5 pt-5 pb-5"><center>No Item Matched Searched Criteria</center></p>


    return(
        <div>
            {noteCards}
            <Pagination>{paginationItems}</Pagination>
        </div>
    )
}