import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import signinService from './services/signin'
import Login from './components/login'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')

  const [loginVisible, setLoginVisible] = useState(false)
  const noteFormRef = useRef()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const logoutOfSite = async (e) => {
    e.preventDefault()
    window.localStorage.clear()
    setUser('')
  }

  const loginToSite = async (e) => {
    e.preventDefault()

    try {
      const user = await signinService.login({ username, password })
      setUser(user)
      noteService.setToken(user.token)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong Cred')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    }
  }

  useEffect(() => {
    const xdd = async () => {
      if (user !== '') {
        const notes = await noteService.getAll(user.id)
        setNotes(notes)
      }
    }
    xdd()
  }, [user])

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const deleteNote = async (id) => {
    await noteService.delte(id)
    setNotes(notes.filter((note) => note.id !== id))
  }

  const LoginForm = () => {
    return (
      <Togglable buttonLabel="sign in">
        <Login
          loginToSite={loginToSite}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      </Togglable>
    )
  }

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    const returnedNote = await noteService.update(id, changedNote)
    setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const noteForm = () => {
    return (
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm createNote={addNote} />
      </Togglable>
    )
  }

  return (
    <div className="m-6">
      <h1 className=" text-4xl mb-5 text-blue-800">Notes</h1>
      <div className="error">{message}</div>
      {user === '' ? (
        LoginForm()
      ) : (
        <div>
          {`${user.name} is logged in`}
          <button
            onClick={logoutOfSite}
            className="border-2 border-black p-0.5 rounded-md mb-2 mx-2"
          >
            logout
          </button>
          <div>
            <button
              className="border-black border-2 p-1 rounded-xl"
              onClick={() => setShowAll(!showAll)}
            >
              show {showAll ? 'important' : 'all'}
            </button>
          </div>
          <ul>
            {notesToShow.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
                deleteNote={() => deleteNote(note.id)}
              />
            ))}
          </ul>
          {noteForm()}
        </div>
      )}
    </div>
  )
}

export default App
