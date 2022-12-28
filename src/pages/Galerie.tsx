import { useNavigate } from "react-router-dom";
import img from "../assets/index";
function Galerie(props: any) {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-900 h-screen flex justify-center items-center text-4xl text-white">
      <div
        className=" absolute top-12 left-12 w-20 h-16 bg-gray-500 rounded-3xl flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {img.Icons.arrowLeft("w-12 h-12 text-white")}
      </div>
      Folgt in Kürze!
    </div>
  );
}
export default Galerie;
