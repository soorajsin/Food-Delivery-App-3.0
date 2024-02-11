import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Account/Login";
import Register from "./Components/Account/Register";
import Nav from "./Components/Navbar/Nav";
import HomePage from "./Components/Home/HomePage";
import ManagementPage from "./Components/Management/ManagementPage";
import TrackPage from "./Components/Management/Track/TrackPage";
import AddFoodPage from "./Components/Management/ADD/AddFoodPage";
import UpdatePage from "./Components/Management/Update/UpdatePage";
import ShoppingPage from "./Components/Home/Shopping/ShoppingPage";
import BuyPage from "./Components/Home/Shopping/Buy/BuyPage";
import ReplyPage from "./Components/Management/Track/Reply/ReplyPage";
import ReplyUpdatePage from "./Components/Management/Track/ReplyUpdate/ReplyUpdatePage";

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
          <Route path="/add" element={<AddFoodPage />} />
          <Route path="/update/:addFoodItemId" element={<UpdatePage />} />
          <Route path="/shopping" element={<ShoppingPage />} />
          <Route path="/buyFood/:addToCartId" element={<BuyPage />} />
          <Route path="/reply/:buyFoodId" element={<ReplyPage />} />
          <Route path="/replyUpdate/:replyByManagementId" element={<ReplyUpdatePage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
