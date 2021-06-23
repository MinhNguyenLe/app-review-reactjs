import React, { useState,useRef, useEffect } from "react";

function UpLoadImg() {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const inputRef = useRef(null);

  const handleUpload = () => {
    inputRef.current?.click();
  };
  const handleDisplayFileDetails = () => {
    inputRef.current?.files && setUploadedFileName("success");
      // setUploadedFileName(inputRef.current.files[0].name);
  };
  return (
    <div className="m-3">
      <input
        ref={inputRef}
        onChange={handleDisplayFileDetails}
        className="d-none"
        type="file"
        accept=".png, .jpg"
      />
      <button
      style={{padding : "10px 20px !important"}}
        onClick={handleUpload}
        className={`btn btn-outline-${
          uploadedFileName ? "success" : "primary"
        }`}
      >
        {uploadedFileName ? uploadedFileName : <i style={{fontSize : "22px"}} className="now-ui-icons media-1_camera-compact"></i>}
      </button>
    </div>
  );
}

export default UpLoadImg;