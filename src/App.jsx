import { useState } from "react";
import Hero from "./components/hero";
import BuzzWords from "./components/buzz";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full ">
      <Hero />
      <BuzzWords />
    </div>
  );
}

export default App;
