import React from "react";

const Avatar = () => {
  return (
    <div style={{ width: "36px" }}>
      <img
        alt="..."
        className="rounded-circle img-fluid"
        src={require("assets/img/avatar.jpg").default}
      ></img>
    </div>
  );
};

export default Avatar;
