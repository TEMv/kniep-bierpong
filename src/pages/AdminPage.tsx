import { useNavigate } from "react-router-dom";
import img from "../assets/index";
import { User, ContentMap } from "../types";
import { useEffect, useState } from "react";
import EditBierpong from "../components/admin/EditBierpong";
import EditEvents from "../components/admin/EditEvents";
import EditPubquiz from "../components/admin/EditPubquiz";
function AdminPage(props: { user: User }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (props.user.role !== "admin") {
      navigate("/");
    }
  }, []);

  const contentMapped: ContentMap = {
    0: <EditEvents />,
    1: <EditBierpong />,
    2: <EditPubquiz />,
    3: <div>N/A</div>,
    4: <div>N/A</div>,
  };

  const [currentCard, setCurrentCard] = useState<number>(0);
  return (
    <div className="h-screen bg-slate-900 flex flex-col justify-center items-center">
      {" "}
      <div
        className=" absolute top-12 left-12 w-20 h-16 rounded-3xl flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {img.Icons.arrowLeft("w-12 h-12 text-white")}
      </div>
      <div className="text-5xl my-8 flex text-white justify-center font-georgia tracking-widest">
        ADMIN
      </div>
      <div className=" h-full w-2/3 rounded-t-lg flex">
        <div className="w-48 flex flex-col">
          <div
            onClick={() => setCurrentCard(0)}
            className={`h-16 mx-2 flex text-center cursor-pointer mt-2 justify-center active:text-primary rounded-2xl items-center text-slate-400 hover:text-slate-200 text-xl ${
              currentCard === 0 && "text-primary hover:text-primary"
            }`}
          >
            Events
          </div>
          <div
            onClick={() => setCurrentCard(1)}
            className={`h-16 mx-2 flex text-center cursor-pointer mt-2 justify-center active:text-primary rounded-2xl items-center text-slate-400 hover:text-slate-200 text-xl ${
              currentCard === 1 && "text-primary hover:text-primary"
            }`}
          >
            Bierpongturnier
          </div>
          <div
            onClick={() => setCurrentCard(2)}
            className={`h-16 mx-2 flex text-center cursor-pointer mt-2 justify-center active:text-primary rounded-2xl items-center text-slate-400 hover:text-slate-200 text-xl ${
              currentCard === 2 && "text-primary hover:text-primary"
            }`}
          >
            Pub-Quiz
          </div>
          <div
            onClick={() => setCurrentCard(3)}
            className={`h-16 mx-2 flex text-center cursor-pointer mt-2 justify-center active:text-primary rounded-2xl items-center text-slate-400 hover:text-slate-200 text-xl ${
              currentCard === 3 && "text-primary hover:text-primary"
            }`}
          >
            Gewinnspiele
          </div>
          <div
            onClick={() => setCurrentCard(4)}
            className={`h-16 mx-2 flex text-center cursor-pointer mt-2 justify-center active:text-primary rounded-2xl items-center text-slate-400 hover:text-slate-200 text-xl ${
              currentCard === 4 && "text-primary hover:text-primary"
            }`}
          >
            Adventskalender
          </div>
        </div>
        <div className="w-1 border-r my-2 border-gray-800"></div>
        <div className="grow  text-slate-200 text-xl">
          {contentMapped[currentCard]}
        </div>
        <div className="w-48"></div>
      </div>
    </div>
  );
}
export default AdminPage;
