import { Outlet, useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { userActions } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });

      dispatch(userActions.addUser(res.data));
    } catch (err) {
      console.log("err :", err);
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
