import { Route, Routes } from "react-router";
import Home from "./Pages/Home";
import Students from "./Pages/Students";
import Teachers from "./Pages/Teachers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/registered-students" element={<Students />} />
      <Route path="/teachers" element={<Teachers />} />
    </Routes>
  );
}

export default App;
