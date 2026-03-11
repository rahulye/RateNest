/** @format */

import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [message, setMessage] = useState("");
  axios.get("http://localhost:5000/health").then((res) => {
      setMessage(res.data.message)
  }).catch(() => {
    return setMessage("Backend not reachable");
  });
  return <>
    <p>{message}</p>
  </>;
}

export default App;
