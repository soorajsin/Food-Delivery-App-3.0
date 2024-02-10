import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Nav from "./Components/Navbar/Nav";
import HomePage from "./Components/Home/HomePage";
import ManagementPage from "./Components/Management/ManagementPage";
import TrackPage from "./Components/Management/Track/TrackPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/management" element={<ManagementPage />} />
          <Route path="/track" element={<TrackPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
