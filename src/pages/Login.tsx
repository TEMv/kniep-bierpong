import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginValues } from "../types";

function Login(props: any) {
  const [inputs, setInputs] = useState<LoginValues>({
    username: { value: "", status: "valid" },
    password: { value: "", status: "valid" },
  });
  const [errorMsg, setErrorMsg] = useState<String>("");

  const navigate = useNavigate();
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ): void => {
    if (
      /^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(
        e.target.value
      )
    ) {
      setInputs({
        ...inputs,
        [key]: { value: e.target.value, status: "valid" },
      });
    } else {
      setInputs({
        ...inputs,
        [key]: { value: e.target.value, status: "warning" },
      });
    }
  };
  const login = async () => {
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/login/",
        {
          username: inputs,
          password: inputs,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_API_SECRET}`,
          },
        }
      );
      console.log(res);
    } catch (e: any | AxiosError) {
      if (axios.isAxiosError(e)) {
        setErrorMsg(e.response?.data.msg);
      } else {
        setErrorMsg("Ein unbekannter Fehler ist aufgetreten!" + e);
      }
    }
    //console.log(res.status);
    /* if (res.status === 200) {
      console.log("LOGGED IN");
      props.setUser({
        username: res.data.userdata.username,
        firstname: res.data.userdata.firstname,
        lastname: res.data.userdata.lastname,
        sessionTk: res.data.token,
        role: res.data.userdata.role,
        uid: res.data.userdata.uid,
      });
      navigate("/");
    }*/
  };
  console.log(inputs.username.status == "warning");
  return (
    <div className="h-screen bg-gray-600 w-full flex flex-col justify-center items-center">
      {errorMsg && <div className="text-red-400">{errorMsg}</div>}
      <input
        className={
          "pl-2 w-64 h-8 rounded focus:outline-none " +
          (inputs.username.status === "warning"
            ? "border-red-500 border-2 focus:border-red-500 focus:outline-none"
            : "")
        }
        placeholder="Benutzername"
        autoComplete="off"
        name="un"
        onChange={(e) => handleInput(e, "username")}
      ></input>
      <div>
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs h-6">
          {inputs.username.status === "warning"
            ? "Ungültiger Benutzername!"
            : ""}
        </span>
      </div>
      <input
        className="pl-2 w-64 h-8 rounded"
        placeholder="Passwort"
        type="password"
        name="pw"
        autoComplete="off"
        onChange={(e) => handleInput(e, "password")}
      ></input>
      <button
        className="py-2 px-5 mt-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        onClick={() => login()}
      >
        Abschicken
      </button>
    </div>
  );
}
export default Login;
