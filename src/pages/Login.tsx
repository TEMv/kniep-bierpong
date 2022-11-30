import axios from "axios";
import { useState } from "react";
function Login(props: any) {
  const [input, setInput] = useState("");
  const hitApi = async () => {
    const res = await axios.get(
      process.env.REACT_APP_API_URL + "/test/" + input,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_SECRET}`,
        },
      }
    );
  };
  const handleInput = (e: any) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };
  return (
    <div className="h-screen bg-gray-600 w-full">
      <input onChange={(e) => handleInput(e)}></input>
      <button onClick={() => hitApi()}>CLICK</button>
    </div>
  );
}
export default Login;
