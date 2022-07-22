import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { authAction } from "./redux/slice/auth-slice";
import { statusAction } from "./redux/slice/status-slice";
import { Alert, Snackbar } from "@mui/material";

const App: React.FC = () => {
  const userState = useAppSelector((state) => state.user);
  const statusState = useAppSelector((state) => state.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let user = localStorage.getItem("user");

    if (user) {
      user = JSON.parse(user);
      dispatch(authAction.setUser(user));
    }
  }, [dispatch]);

  return (
    <div className="font-Roboto">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              !userState.username ? <LoginPage /> : <Navigate to="/dashboard" />
            }
          />
          <Route
            path="/register"
            element={
              !userState.username ? (
                <RegisterPage />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              !!userState.username ? <Dashboard /> : <Navigate to="/login" />
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
      <Snackbar
        open={statusState.isOpen && !!statusState.message}
        autoHideDuration={6000}
        onClose={() => dispatch(statusAction.toggleAlert(false))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={statusState.status}>{statusState.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default App;
