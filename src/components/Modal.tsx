import { useState, useEffect } from "react";
import { ModalContentType } from "../types";
function Modal(props: {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  data: any;
  type: ModalContentType;
}) {
  const [content, setContent] = useState(<></>);
  useEffect(() => {
    switch (props.type) {
      case "edit-teams":
        setContent(
          <div className="relative p-6 flex-auto justify-between flex max-h-140 w-160 overflow-y-scroll scrollbar">
            <div className="w-68">
              {props.data
                .slice(0, props.data.length / 2)
                .map((entry: any, index: number) => (
                  <div
                    key={entry.teamid}
                    className={`py-1 rounded-lg flex ${
                      index % 2 == 0 ? "bg-slate-700" : ""
                    }`}
                  >
                    <div className="rounded-lg w-8 h-8 min-w-8 text-center border-slate-200 border ">
                      {" "}
                      {entry.teamid}
                    </div>
                    <div className="ml-4 w-64 truncate">{entry.teamname}</div>
                  </div>
                ))}
            </div>
            <div className="w-68">
              {props.data
                .slice(props.data.length / 2, props.data.length)
                .map((entry: any, index: number) => (
                  <div
                    key={entry.teamid}
                    className={`py-1 rounded-lg flex ${
                      index % 2 == 1 ? "bg-slate-700" : ""
                    }`}
                  >
                    <div className="rounded-lg w-8 h-8 min-w-8 text-center border-slate-200 border ">
                      {" "}
                      {entry.teamid}
                    </div>
                    <div className="ml-4 w-64 truncate">{entry.teamname}</div>
                  </div>
                ))}
            </div>
          </div>
        );
        break;
      case "add-missing-teams":
        setContent(<></>);
        break;
      default:
        break;
    }
  }, [props.type]);

  return (
    <>
      {props.modalVisible ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-600 rounded-t">
                  <h3 className="text-3xl font-semibold">{props.title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-slate-200  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setModalVisible(false)}
                  >
                    <span className="bg-transparent text-slate-200 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {content}
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-600 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setModalVisible(false)}
                  >
                    Schliessen
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setModalVisible(false)}
                  >
                    Speichern
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
export default Modal;
