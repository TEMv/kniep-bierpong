import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginValues } from "../types";
import img from "../assets/index";
import { useLogin } from "../hooks/queries";
import PageFooter from "../components/PageFooter";

function Login(props: any) {
  const [inputs, setInputs] = useState<LoginValues>({
    username: { value: "", status: "valid" },
    password: { value: "", status: "valid" },
  });
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ): void => {
    if (
      (/^(?=.{3,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+$/.test(
        e.target.value
      ) &&
        key === "username") ||
      (/^([a-zA-Z0-9@*#+]{8,15})$/.test(e.target.value) && key === "password")
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
  function handleLoggedIn(data: any): void {
    const { token, userdata } = data;
    props.setUser({
      username: userdata.username,
      firstname: userdata.firstname,
      lastname: userdata.lastname,
      role: userdata.role,
      uid: userdata.uid,
      last_login: userdata.last_login,
    });
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userdata));
    navigate("/");
  }

  const handleKeyDown = (key: String) => {
    if (key == "Enter") {
      sendLogin();
    }
  };

  const sendLogin = () => {
    if (
      inputs.password.status === "valid" &&
      inputs.password.value.length > 0 &&
      inputs.username.status === "valid" &&
      inputs.username.value.length > 0
    ) {
      loginMutation.mutate(
        {
          username: inputs.username,
          password: inputs.password,
        },
        { onSuccess: (e) => handleLoggedIn(e) }
      );
    } else {
      setInputs({
        password: { ...inputs.password, status: "warning" },
        username: { ...inputs.username, status: "warning" },
      });
    }
  };

  return (
    <div className="h-screen bg-gray-600 w-full flex flex-col justify-center items-center">
      <div
        className=" absolute top-12 left-12 w-20 h-16 bg-gray-500 rounded-3xl flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        {img.Icons.arrowLeft("w-12 h-12 text-white")}
      </div>
      <div className="flex flex-col bg-gray-500 w-80 justify-center items-center h-96 rounded-3xl relative">
        <div className="font-georgia absolute top-8 text-white justify-around w-64 drop-shadow-sm text-4xl tracking-widest flex items-center">
          <img
            src={img.Logos.logo_einzeln_weiss}
            alt="kniep"
            className="h-16"
          />{" "}
          LOGIN
        </div>
        <div className="h-20"></div>
        <div className="text-red-400 h-10">
          {loginMutation.isError &&
            loginMutation.error instanceof AxiosError &&
            loginMutation.error.response?.data.msg}
        </div>

        <input
          className={
            "pl-2 w-64 h-8 rounded focus:outline-none " +
            (inputs.username.status === "warning"
              ? "border-red-500 border-2 focus:border-red-500 focus:outline-none"
              : "")
          }
          placeholder="Benutzername"
          autoComplete="off"
          onKeyDown={(e) => handleKeyDown(e.key)}
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
          className={
            "pl-2 w-64 h-8 rounded focus:outline-none " +
            (inputs.password.status === "warning"
              ? "border-red-500 border-2 focus:border-red-500 focus:outline-none"
              : "")
          }
          placeholder="Passwort"
          type="password"
          onKeyDown={(e) => handleKeyDown(e.key)}
          name="pw"
          autoComplete="off"
          onChange={(e) => handleInput(e, "password")}
        ></input>
        <div>
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs h-6">
            {inputs.password.status === "warning" ? "Ungültiges Passwort!" : ""}
          </span>
        </div>
        <button
          className="py-2 px-5 mt-2 mr-2 mb-2 text-sm font-medium focus:outline-none  rounded-lg border  focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"
          onClick={() => sendLogin()}
        >
          Login
        </button>
      </div>
      <PageFooter />
    </div>
  );
}
export default Login;
