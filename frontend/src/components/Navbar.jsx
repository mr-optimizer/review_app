import React from "react";
import { BsFillSunFill } from "react-icons/bs";
import Container from "./Container";

export default function Navbar() {
  return (
    <div className=" bg-secondary shadow-sm shadow-gray-500">
      <Container className=" p-2">
        <div className="flex justify-between items-center">
          <img src="./logo.png" alt="" />
          <ul className="flex items-center space-x-4">
            <l1>
              <button className="bg-dark-subtle p-1 rounded">
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
            <li className="font-semibold text-lg">Log-in</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
