import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="App" key={location.pathname}>
      {location.pathname === "/login" ||
      location.pathname === "/reister" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/reset-password" ? (
        <></>
      ) : (
        <Nav />
      )}
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
