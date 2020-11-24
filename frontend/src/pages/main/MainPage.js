import './main.css'
import CardsList from './CardsList'
import SearchBar from './SearchBar'

export default function  MainPage(){
    return (
        <div style={{marginTop:'20px'}}>
            <SearchBar></SearchBar>
            <CardsList></CardsList>
        </div>
    )
}