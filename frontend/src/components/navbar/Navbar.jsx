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
      <div className="bg-white py-2">
        <Container className=" flex justify-between ">
          <div className="flex">
            <img
              src="/images/logo-tecnm.png"
              alt="Logo"
              width="100px"
              className=" mr-5"
            />
            <img
              src="/images/logo_tecnm_acapulco.jpg"
              alt="Logo"
              width="70px"
            />
          </div>

          <h2 className=" font-bold text-2xl text-blue-950">
            Desarrollo Académico
          </h2>
        </Container>
      </div>
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
                    " bg-white text-blue-950 font-bold px-3 py-1 "
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
                  location.pathname === href && "bg-white px-3 py-1 text-black"
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
