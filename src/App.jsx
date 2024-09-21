import { useState } from "react";

import Fireworks from "./components/fireworks";
import HappyBirthdayAyo from "./components/animation";

function App() {
  const [count, setCount] = useState(0);

  return <Fireworks />;
}
//   return (
//     // <div className="relative bg-white w-screen min-h-screen">
//       {/* <Fireworks /> */}
//       <HappyBirthdayAyo />
//       {/* <FloatingImages /> */}

//     // </div>
//   );
// }

export default App;
