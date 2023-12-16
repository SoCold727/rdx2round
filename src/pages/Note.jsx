import { useMemo } from "react";
import { Api } from "../utils/api";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectNotesData, selectNotesLoading } from "../redux/notes/selector";

const Note = () => {
  const { id } = useParams();
  const notes = useSelector(selectNotesData);
  const loading = useSelector(selectNotesLoading);

  const handleDelete = async (id) => {
    await Api.deleteNote(id);
  };

  const note = useMemo(() => notes.find((note) => note.id == id), [id, notes]);

  if (loading || !note) return <div>Loading</div>;
  return (
    <div>
      <div className="flex flex-row justify-between">
        <Link
          to="/notes"
          className="border-2 border-black px-2 py-1 text-1xl text-white bg-green-500 hover:bg-green-700"
        >
          Назад
        </Link>
        <h1 className="text-5xl">{note.title}</h1>
        <div className="text-3xl">
          <button onClick={() => handleDelete(id)}>-</button>
          <Link to={`edit`}>+</Link>
        </div>
      </div>
      <div className="mt-4 text-2xl border-t border-black p-2">
        {note.content}
      </div>
    </div>
  );
};
export default Note;
