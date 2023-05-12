import "./App.scss";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { RequiredAuth } from "./components/RequiredAuth/RequiredAuth";
import { Profile } from "./components/Profile/Profile";
import { AdminPage } from "./components/AdminPage/AdminPage";
import { Home } from "./components/Home/Home";
import { Preventivo } from "./components/Preventivo/Preventivo";
import { Gallery } from "./components/Gallery/Gallery";
import { NavBar } from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Routes da proteggere solo con ruoli permessi */}

        <Route path="/" element={<Home />} />
        <Route path="/preventivo" element={<Preventivo />} />
        <Route path="/gallery" element={<Gallery />} />

        <Route element={<RequiredAuth allowedRoles={["ROLE_USER"]} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<RequiredAuth allowedRoles={["ROLE_ADMIN"]} />}>
          <Route path="/adminpage" element={<AdminPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
