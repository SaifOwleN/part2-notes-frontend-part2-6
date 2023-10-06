import { useState, useEffect } from "react"
import axios from "axios"
import Note from "./components/Note"
import noteService from "./services/notes"
import signinService from "./services/signin"
import Login from "./components/login"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedNoteAppUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const loginToSite = async (e) => {
    e.preventDefault()
    console.log("password", password)

    try {
      const user = await signinService.login({ username, password })
      setUser(user)
      noteService.setToken(user.token)
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log("wrong")
    }
  }
  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote("")
    })
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }
    console.log("changedNote", JSON.stringify(changedNote))
    noteService
      .update(id, changedNote)
      .then((res) => {
        noteService.getAll().then((initialNotes) => {
          setNotes(initialNotes)
        })
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div className="m-6">
      <h1 className=" text-4xl mb-5 text-blue-800">Notes</h1>
      <Login />
      <div>
        <button
          className="border-black border-2 p-1 rounded-xl"
          onClick={() => setShowAll(!showAll)}
        >
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          className="border-2 border-black mt-2 mr-2 "
          value={newNote}
          onChange={handleNoteChange}
        />
        <button className="border-2 border-black rounded-md px-1" type="submit">
          save
        </button>
      </form>
    </div>
  )
}

export default App
