import React, { useState,useRef, useEffect } from "react";

function UpLoadImg({content,upAvatar,setUpAvatar,refAvatar}) {
  const handleUpload = () => {
    refAvatar.current?.click();
  };
  const handleDisplayFileDetails = (e) => {
    refAvatar.current?.files && setUpAvatar(refAvatar.current.files[0].name);
    console.log(refAvatar.current.files[0])
  };
  return (
    <div className="m-3">
      <input
      enctype="multipart/form-data"
        ref={refAvatar}
        onChange={(e)=>handleDisplayFileDetails()}
        className="d-none"
        type="file"
        accept=".png, .jpg"
      />
      <button
      style={{padding : "10px 20px !important",display : "flex",alignItems:"center"}}
        onClick={handleUpload}
        className={`btn btn-outline-${
          upAvatar ? upAvatar : "primary"
        }`}
      >
        {upAvatar ? upAvatar : 
          (
            <>
              <i style={{fontSize : "22px",marginRight :"8px"}} className="now-ui-icons media-1_camera-compact"></i>{content}
            </>
          )}
      </button>
    </div>
  );
}

export default UpLoadImg;