import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

export default function AuthUser() {
  const authSuccess = Cookies.get("token");

  if (!authSuccess) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ backgroundColor: "#e0e1da", width: "100%" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <Sidebar />
        </div>
        <div
          style={{
            width: "100%",
          }}
        >
          {/* <Navbar /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
