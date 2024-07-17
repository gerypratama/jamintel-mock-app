import { Route, Routes } from "react-router-dom";
import Overview from "./routes/Overview";
import Login from "./routes/Login";
import AuthUser from "./routes/AuthUser";
import Networks from "./routes/Networks";
import Wiretapping from "./routes/Wiretapping";
import store from "./store";
import { Provider } from "react-redux";
import Dashboard from "./routes/Dashboard";
import SearchResult from "./routes/SearchResult";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<AuthUser />}>
          <Route path="/" element={<Dashboard />} />
          <Route element={<SearchResult />}>
            <Route path="info-buronan/overview" element={<Overview />} />
            <Route path="info-buronan/jaringan" element={<Networks />} />
            <Route path="info-buronan/penyadapan" element={<Wiretapping />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
