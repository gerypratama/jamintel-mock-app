import { Route, Routes } from "react-router-dom";
import Overview from "./routes/Overview";
import Login from "./routes/Login";
import AuthUser from "./routes/AuthUser";
import Networks from "./routes/Networks";
import Wiretapping from "./routes/Wiretapping";
import SocialMedia from "./routes/SocialMedia";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AuthUser />}>
          <Route path="/" element={<Overview />} />
          <Route path="network" element={<Networks />} />
          <Route path="wiretapping" element={<Wiretapping />} />
          <Route path="socmed" element={<SocialMedia />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
