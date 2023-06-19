import Auth from "./Auth.js";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, NotFound, Register } from "./views/index.js";
import Chat from "views/Chat.jsx";

function App() {
  useEffect(() => {
    Auth.init();
  }, []);

  return (
    <div id="main-container" className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={Auth.guest() ? <Login /> : <Chat />} />
          {Auth.guest() && (
            <>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
            </>
          )}

          <Route path="*" element={Auth.auth() ? <NotFound /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;