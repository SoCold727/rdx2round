import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Api } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData } from "../redux/user/selectors";
import { SET_NOTES_ERROR } from "../redux/notes/const";

const AddNote = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUserData);
  const handleSubmit = async () => {
    try {
      if (!title.trim()) {
        throw new Error("Введите название");
      }
      const res = await Api.postNote({ title, content, userId: user.id });
      if (res?.id) {
        navigate("/notes");
      }
    } catch (error) {
      dispatch({ type: SET_NOTES_ERROR, payload: error });
    }
  };

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
          Добавить заметку
        </h1>
        <input
          type="text"
          className="border-2 border-black py-2 px-1 rounded text-gray-500"
          name="title"
          placeholder="Название заметки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Тело заметки"
          className="border-2 border-black h-[40vh] px-1 rounded text-gray-500"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="border-2 border-black px-2 py-1 text-3xl self-center rounded text-white bg-green-500 hover:bg-green-700"
          onClick={handleSubmit}
        >
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddNote;
