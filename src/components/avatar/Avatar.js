import React from "react";
import imgDefault from "assets/img/default-avatar.png";

const Avatar = ({ linkImg, type }) => {
  return (
    <div>
      <img
        style={
          type === "review"
            ? { width: "44px", height: "44px" }
            : { width: "36px", height: "36px" }
        }
        alt="..."
        className="rounded-circle img-fluid"
        src={linkImg ? linkImg : imgDefault}
      ></img>
    </div>
  );
};

export default Avatar;
