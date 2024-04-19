import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-[calc(100vh-64px)] flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold my-2">404 - Not Found!</h1>
      <Link to="/" className="flex text-green-700">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
