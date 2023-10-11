import { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (e) => {
    e.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })
    setNewNote('')
  }

  return (
    <div>
      <h2>create new note</h2>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          className="rounded-xl border-2 border-black bg-gray-200 p-1 mr-2 "
          onChange={({ target }) => setNewNote(target.value)}
        ></input>
        <button type="submit">save</button>
      </form>
    </div>
  )
}
export default NoteForm
