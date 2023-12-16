import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { Api } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../redux/user/selectors";
import { SET_NOTES_ERROR } from "../redux/notes/const";
import { selectNotesData, selectNotesLoading } from "../redux/notes/selector";
const EditNote = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const notes = useSelector(selectNotesData);
  const loading = useSelector(selectNotesLoading);

  const note = useMemo(() => notes.find((note) => note.id == id), [id, notes]);

  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const handleSubmit = async () => {
    if (!title.trim()) {
      dispatch({
        type: SET_NOTES_ERROR,
        payload: new Error("Введите название"),
      });
    }
    await Api.putNote({ title, content, userId: user.id, id });
  };

  if (loading || !note) return <div>Загрузка...</div>;

  return (
    <div>
      <div className="flex flex-col gap-3 w-2/3 mx-auto">
        <Link
          to="/notes"
          className="border-2 border-black px-2 py-1 text-2xl text-center w-[100px] text-white bg-green-500 hover:bg-green-700"
        >
          Назад
        </Link>
        <h1 className="text-3xl text-center mb-3 text-green-500">
          Редактировать заметку
        </h1>
        <input
          type="text"
          className="border-2 border-black py-2 px-1"
          placeholder="Название заметки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Описание"
          className="border-2 border-black h-[40vh] px-1"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="border-2 border-black px-2 py-1 text-3xl self-center rounded text-white bg-green-500 hover:bg-green-700"
          onClick={handleSubmit}
        >
          Изменить
        </button>
      </div>
    </div>
  );
};

export default EditNote;
