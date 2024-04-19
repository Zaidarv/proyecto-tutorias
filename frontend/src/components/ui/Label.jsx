import React from "react";

export function Label({ children }, htmlFor) {
  return (
    <label
      className="block text-sm font-medium text-blue-700"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export default Label;
