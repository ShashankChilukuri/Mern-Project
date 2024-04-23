
import React from "react";

const LogoutButton = ({ onLogout }) => {
  const handleLogout = () => {
    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
