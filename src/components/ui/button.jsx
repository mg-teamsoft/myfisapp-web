import React from "react";

export const Button = ({ children, className = "", ...props }) => (
  <button
    className={`text-lg px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
