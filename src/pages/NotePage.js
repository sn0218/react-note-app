import React, {useEffect, useState} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    let params = useParams()
    let noteID = params.id
    console.log(noteID)
    const navigate = useNavigate()
    //let note = notes.find(note => note.id === Number(params.id))

    let [note, setNote] = useState(null)

    useEffect(() => {
        let getNote = async () => {
            if (noteID === 'new') return 
            let response = await fetch(`http://127.0.0.1:8000/notes/${noteID}`)
            let data = await response.json()
            setNote(data)
    
        }
        getNote();
    }, [noteID])

    

    // create note on the backend
    let createNote = async () => {
        await fetch(`http://127.0.0.1:8000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })  

        // redirect user to the homepage after creating note
        navigate('/')  
    }

    // update note on the backend
    let updateNote = async () => {
        await fetch(`http://127.0.0.1:8000/notes/${noteID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...note, 'updated': new Date() })
        })  
    }

    // delete note on the backend
    let deleteNote = async () => {
        await fetch(`http://127.0.0.1:8000/notes/${noteID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        
        // redirect user to the homepage after deleting note
        navigate('/')  
    }

    // handle data submission when clicked back arrow
    let handleSubmit = () => {

        if (noteID !== 'new' && !note.body) {
            deleteNote()
        } else if (noteID !== 'new') {
            updateNote()
        } else if (noteID === 'new' && note !== null) {
            createNote()
        }
        // redirect user to the homepage
        navigate('/')
    }

  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
               <Link to='/' >
                <ArrowLeft onClick={handleSubmit}/>
                </Link> 
            </h3>

            {/* check if the note is new */}
            {noteID !== 'new'? 
                (<button onClick={deleteNote}>Delete</button>)
                : (<button onClick={createNote}>Done</button>) }
            
        </div>


        <textarea onChange={(e)=> {setNote({...note, 'body': e.target.value})}} value={note?.body}>
        </textarea>
        
    </div>
  )
}

export default NotePage