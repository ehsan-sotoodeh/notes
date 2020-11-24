import react from 'react';
import NoteCard from './NoteCard';
import {Pagination} from 'react-bootstrap';

export default function CardsList(){
    let active = 1;
    let items = [];
    for (let number = 1; number <= 5; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active}>
        {number}
        </Pagination.Item>,
    );
    }


    return(
        <div>
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <NoteCard />
            <Pagination>{items}</Pagination>
        </div>
    )
}