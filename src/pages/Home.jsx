import { Link } from "react-router-dom";
import { options } from "../utils/const";
import { useSelector } from "react-redux";
import { selectUserData } from "../redux/user/selectors";
const Home = () => {
  const { email, createdAt } = useSelector(selectUserData);
  return (
    <div className="flex flex-col mx-auto w-2/3 gap-2">
      <h1 className="text-3xl text-center">Про меня</h1>
      <div className="flex flex-col my-5 gap-1">
        <span>
          <strong>Email: </strong>
          {email}
        </span>
        <span>
          <strong>Дата регистрации: </strong>
          {new Date(createdAt).toLocaleDateString("ru-Ru", options)}
        </span>
      </div>
      <Link
        to="notes"
        className="border-2 border-black px-2 py-1 text-2xl self-center rounded text-white bg-green-500 hover:bg-green-700"
      >
        К заметкам
      </Link>
    </div>
  );
};

export default Home;
