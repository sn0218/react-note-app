import React, {useEffect, useState} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesListPage = () => {
    // set component state variables
    let [notes, setNotes] = useState([]);

    // fire off dependencies in the first load of component for single update
    useEffect(() => {
        getNotes()
    }, [])

    // use fetch API to get data
    let getNotes = async () => {
        let response = await fetch('http://localhost:8000/notes/')
        let data = await response.json()
        //console.log("data:", data)

        // update notes state by pushing the data into the empty array
        setNotes(data)
    }

    return (

        <div className="notes">
            <div className="notes-header">
                <h2 className='notes-title'>&#9782; Notes</h2>
                <p className='notes-count'>{notes.length}</p>
            </div>
            <div className="notes-list">
                {notes.slice(0).reverse().map((note, index) => (
                    <ListItem key={index} note={note} />
                ))}
                
            </div>
            <AddButton />
        </div>
    )
}

export default NotesListPage