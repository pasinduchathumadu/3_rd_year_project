import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Blogs from "./components/Blogs";
import Login from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <React.Fragment>
      <main>
        <Routes>
          <Route path="/blogs" element={isLoggedIn ? <Blogs /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;


