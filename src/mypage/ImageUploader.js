import React, { useState } from "react";
import { storage } from "../api/FireBase";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [url, setUrl] = useState("");

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      console.error("파일이 선택 안됨");
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      console.error("파일이 업로드 되지 않음");
      return;
    }

    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    fileRef.put(file).then(() => {
      console.log("파일이 정상적으로 업로드됨");
      fileRef.getDownloadURL().then((url) => {
        console.log("저장경로 확인 : " + url);
        setUrl(url);
      });
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          style={{ width: "200px", height: "200px" }}
        />
      )}
      <button onClick={handleUploadClick}>Upload</button>
      {url && (
        <img
          src={url}
          alt="uploaded"
          style={{ width: "200px", height: "200px" }}
        />
      )}
    </div>
  );
};

export default ImageUploader;
