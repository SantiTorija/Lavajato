import "./App.css";
import Home from "./pages/home";
import Calendar from "./pages/Calendar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendario" element={<Calendar />} />
      </Routes>
    </>
  );
}

export default App;
