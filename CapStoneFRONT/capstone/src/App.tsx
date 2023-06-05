import "./App.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { RequiredAuth } from "./components/RequiredAuth/RequiredAuth";
import Profile from "./components/Profile/Profile";
import AdminPage from "./components/AdminPage/AdminPage";
import { Home } from "./components/Home/Home";
import Preventivo from "./components/Preventivo/Preventivo";
import { NavBar } from "./components/NavBar/NavBar";
import NotFound from "./components/NotFound/NotFound";
import { Footer } from "./components/Footer/Footer";
import RegisterSucces from "./components/RegisterSucces";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        {/* Routes da proteggere solo con ruoli permessi */}

        <Route path="/" element={<Home />} />
        <Route path="/preventivo" element={<Preventivo />} />
        <Route path="/registersuccss" element={<RegisterSucces />} />

        <Route element={<RequiredAuth allowedRoles={["ROLE_USER"]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<RequiredAuth allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/adminpage" element={<AdminPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
