import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import '../Keeper/Keeper.css'
import Header from './Header'
import Footer from './Footer'
import Note from './Note'
import CreateArea from './CreateArea'
import { v4 as uuidv4 } from 'uuid'

function Keeper() {
    const navigate = useNavigate()

    const [notes, setNotes] = useState([])
    const localhost = 'http://localhost:3333/user'

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const usernameFromSession = sessionStorage.getItem('username')
                if (!usernameFromSession) {
                    navigate('/')
                    return
                }

                const response = await fetch(`${localhost}?id=${usernameFromSession}`)
                const resp = await response.json()

                if (resp.length === 0) {
                    throw new Error('User not found')
                }

                setNotes(resp[0].notes)
            } catch (err) {
                toast.error('Failed to fetch notes: ' + err.message)
            }
        }

        fetchNotes()
    }, [navigate])

    const addNote = async (newNote) => {
        try {
            newNote.id = uuidv4()

            const response = await fetch(`${localhost}?id=${sessionStorage.getItem('username')}`)
            const resp = await response.json()
            const user = resp[0]
            user.notes.push(newNote)

            const updateResponse = await fetch(`${localhost}/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })

            if (!updateResponse.ok) {
                throw new Error('Network response was not ok')
            }

            setNotes(prevNotes => [...prevNotes, newNote])
            toast.success('Note added successfully')
        } catch (err) {
            toast.error('Failed to add note: ' + err.message)
        }
    }

    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${localhost}?id=${sessionStorage.getItem('username')}`)
            const resp = await response.json()
            const user = resp[0]
            user.notes = user.notes.filter(note => note.id !== id)

            const updateResponse = await fetch(`${localhost}/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })

            if (!updateResponse.ok) {
                const errorMessage = await updateResponse.text()
                throw new Error(`Network response was not ok: ${updateResponse.status} ${errorMessage}`)
            }

            setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
            toast.success('Note deleted successfully')
        } catch (err) {
            toast.error('Failed to delete note: ' + err.message)
            console.error(err)
        }
    }

    return (
        <div>
            <Header />
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem, index) => {
                return (
                    <Note key={index} id={noteItem.id} title={noteItem.title} content={noteItem.content} onDelete={deleteNote} />
                )
            })}
            <Footer />
        </div>
    )
}

export default Keeper