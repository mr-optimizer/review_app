import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth, useTheme } from "../hooks/customHooks";
import Container from "./Container";

export default function Navbar() {
  const { toggleTheme } = useTheme(); //custom hook to change theme
  const { authInfo, handleLogOut } = useAuth();
  const { isLoggedIn } = authInfo;
  return (
    <div className=" bg-secondary shadow-sm shadow-gray-500">
      <Container className=" p-2">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="./logo.png" alt="" />
          </Link>
          <ul className="flex items-center space-x-4">
            <l1>
              <button
                onClick={toggleTheme}
                className="dark:bg-white bg-dark-subtle p-1 rounded"
              >
                <BsFillSunFill className="text-secondary" size={24} />
              </button>
            </l1>
            <li>
              <input
                type="text"
                className="border-2 border-dark-subtle p-1 rounded bg-transparent text-xl outline-none focus:border-white transition"
                placeholder="Search..."
              />
            </li>
            <li className="font-semibold text-lg text-white">
              {isLoggedIn ? (
                <button
                  onClick={handleLogOut}
                  className=" text-white font-semibold text-lg"
                >
                  Log out
                </button>
              ) : (
                <Link
                  className=" text-white font-semibold text-lg"
                  to="/auth/sign-in"
                >
                  Log-in
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
