import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import VideogameCreate from "./components/VideogameCreate";
import Detail from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/videogame" element={<VideogameCreate />} />
        <Route exact path="/home/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
