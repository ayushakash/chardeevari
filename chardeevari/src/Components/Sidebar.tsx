import React from "react";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="list-group">
        <li className="list-group-item active">Dashboard</li>
        <li className="list-group-item">Profile</li>
        <li className="list-group-item">Messages</li>
        <li className="list-group-item">Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;
