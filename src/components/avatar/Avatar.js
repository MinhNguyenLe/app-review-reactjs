import React from "react";
import imgDefault from "assets/img/default-avatar.png";
import { Link } from "react-router-dom";

const Avatar = ({ linkImg, type }) => {
  return (
    <Link to="/mypage" style={{ cursor: "pointer" }}>
      <img
        style={
          type === "review"
            ? { width: "44px", height: "44px" }
            : { width: "44px", height: "44px" }
        }
        alt="..."
        className="obj-fit rounded-circle img-fluid"
        src={linkImg ? linkImg : imgDefault}
      ></img>
    </Link>
  );
};

export default Avatar;
