import React from "react";

export function Button({ children }) {
  return (
    <button className="relative inline-flex items-center gap-x-1.5 rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline-offset-2 focus-visible:outline-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white">
      {children}
    </button>
  );
}

export default Button;
