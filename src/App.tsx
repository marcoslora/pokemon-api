import { useState } from "react";
import "./App.css";
import Pokemones from "./components/Pokemones";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Pokemones />
    </div>
  );
}

export default App;
