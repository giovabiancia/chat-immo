import { useState } from "react";
import "./App.css";
import { RealEstateChat } from "./components/real-estate-chat";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RealEstateChat></RealEstateChat>
    </>
  );
}

export default App;
