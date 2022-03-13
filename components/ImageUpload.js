import React, { useState } from "react";
import { API_URL } from "../pages/config";
import styles from "../styles/Form.module.css";
const ImageUpload = ({ id, imageUploaded }) => {
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id)
    console.log(image);
    const formData = new FormData();

    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", id);
    formData.append("field", "image");
    console.log(formData);
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
      body: formData,
    });
    console.log(res);

    //   if (res.ok) {
    //     imageUploaded()
    //   }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.form}>
      <h1>Upload Event Image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
};

export default ImageUpload;
