import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

export const Body = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
