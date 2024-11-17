import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
    <p className="mt-4 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
    <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      Go Home
    </Link>
  </div>
);

export default NotFound;
