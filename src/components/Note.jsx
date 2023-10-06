const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important"

  return (
    <li className=" text-md">
      {note.content}
      <button
        className="mx-2 p-1 border-2 border-black rounded-md"
        onClick={toggleImportance}
      >
        {label}
      </button>
    </li>
  )
}

export default Note
