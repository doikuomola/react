import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Dashboard,
  Home,
  Login,
  NotFound,
  Register,
  SingleTour,
} from "./pages";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";
import { Header, PrivateRoute } from "./components";
import AddEditTour from "./pages/AddEditTour";

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    dispatch(setUser(user));
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/addTour"
          element={
            <PrivateRoute>
              <AddEditTour />
            </PrivateRoute>
          }
        />
        <Route
          path="/editTour/:id"
          element={
            <PrivateRoute>
              <AddEditTour />
            </PrivateRoute>
          }
        />
        <Route path="/tour/:id" element={<SingleTour />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
