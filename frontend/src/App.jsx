import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.text()) // since your backend returns a string
      .then((data) => setMessage(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React + Spring Boot Test</h1>
      <p className="text-black">{message}</p>
    </div>
  );
}

export default App;
