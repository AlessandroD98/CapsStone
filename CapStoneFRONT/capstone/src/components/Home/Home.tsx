import About from "../About/About";
import Contact from "../Contact/Contact";
import FeedBack from "../FeedBack/FeedBack";
import { Header } from "../Header/Header";
import Experience from "../MidPart/Experience";
import "../Register/Register.scss";

export const Home = () => {
  // const [islogged, setIslogged] = useState(true);

  // const handleLogin = () => {
  //   setIslogged(!islogged);
  // };

  return (
    <div>
      <Header />
      <About />
      <Experience />
      <FeedBack />
      <Contact />
    </div>
  );
};
