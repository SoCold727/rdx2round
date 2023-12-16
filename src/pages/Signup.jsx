import { useState } from "react";
import { z } from "zod";
import { Api } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import { regUser } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, selectUserError } from "../redux/user/selectors";
import { SET_USER_DATA, SET_USER_ERROR } from "../redux/user/const";
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const user = useSelector(selectUserData);
  const error = useSelector(selectUserError);

  const handleSubmit = async () => {
    try {
      const { repeatedPassword, ...user } = regUser.parse({
        password,
        email,
        repeatedPassword,
        createdAt: Date.now(),
      });
      const payload = await Api.postUser(user);
      dispatch({ type: SET_USER_DATA, payload });
    } catch (error) {
      if (error instanceof z.ZodError) {
        dispatch({ type: SET_USER_ERROR, payload: error.foramt() });
      } else {
        dispatch({ type: SET_USER_ERROR, payload: error });
      }
    }
  };

  if (user?.id) return navigate("/");
  return (
    <div className="flex flex-col w-2/4 mx-auto gap-3 text-2xl">
      <h1 className="text-5xl text-center">Sign up</h1>
      <input
        type="text"
        placeholder="e-mail"
        className="border-2 border-black py-2 px-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error?.email && (
        <div className="text-green-500">{error?.email?._errors}</div>
      )}
      <input
        type="password"
        placeholder="Пароль"
        className="border-2 border-black py-2 px-3"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Повторите пароль"
        className="border-2 border-black py-2 px-3"
        value={repeatedPassword}
        onChange={(e) => setRepeatedPassword(e.target.value)}
      />

      {error?.repeatedPassword && (
        <div className="text-orange-500">
          {error?.repeatedPassword?._errors}
        </div>
      )}

      {error?.message && (
        <div className="text-orange-500">{error?.message}</div>
      )}

      <div className="flex justify-between mt-5">
        <button
          className="border-2 border-black px-2 py-1 text-3xl self-center rounded text-white bg-green-500 hover:bg-green -700"
          onClick={handleSubmit}
        >
          Зарегистр.
        </button>
        <Link to="/login" className="self-center ">
          Войти
        </Link>
      </div>
    </div>
  );
};
export default Signup;
