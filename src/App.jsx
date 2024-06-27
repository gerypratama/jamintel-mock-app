import { Route, Routes } from "react-router-dom";
import Overview from "./routes/Overview";
import Login from "./routes/Login";
import AuthUser from "./routes/AuthUser";
import Networks from "./routes/Networks";
import Wiretapping from "./routes/Wiretapping";
import SocialMedia from "./routes/SocialMedia";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<AuthUser />}>
        <Route path="/" element={<Overview />} />
        <Route path="network" element={<Networks />} />
        <Route path="wiretapping" element={<Wiretapping />} />
        <Route path="socmed" element={<SocialMedia />} />
      </Route>
    </Routes>
  );
}

export default App;
