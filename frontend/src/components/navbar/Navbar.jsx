import React from "react";
import { Link, useLocation } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./navigation";
import { Container } from "../ui/Container";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const location = useLocation();
  const { isAuth, logout } = useAuth();

  return (
    <nav className=" bg-blue-950">
      <Container className="flex justify-between py-3">
        <Link to="/">
          <h1 className="font-bold text-2xl text-white">Tutorías</h1>
        </Link>

        <ul className=" flex gap-x-2">
          {isAuth ? (
            <>
              {privateRoutes.map(({ name, href }) => (
                <li
                  className={` text-white ${
                    location.pathname === href &&
                    " bg-white px-3 py-1 text-black font-bold"
                  }`}
                  key={href}
                >
                  <Link to={href}>{name}</Link>
                </li>
              ))}
              <li
                className=" text-white"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </li>
            </>
          ) : (
            publicRoutes.map(({ name, href }) => (
              <li
                className={` text-white ${
                  location.pathname === href &&
                  "bg-white px-3 py-1 text-black font-bold"
                }`}
                key={href}
              >
                <Link to={href}>{name}</Link>
              </li>
            ))
          )}
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
