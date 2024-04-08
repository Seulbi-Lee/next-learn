"use client";

import { FileInput } from "@mantine/core";
import { getVisionZFile, useVisionZUpload } from "@visionz/upload-helper-react";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/app/_utils/_supabase/client";

const UploadPage = () => {
  const [imageSrc, setImageSrc] = useState("");
  const { onFileChange, uploadSelectedFile, selectedFile } = useVisionZUpload("/api/upload");
  const supabase = createClient();

  const uploadFile = async() => {
    const uploadId = await uploadSelectedFile();
    console.log(uploadId);

    const fileUrl = await getVisionZFile("/api/upload", uploadId);
    console.log(fileUrl);
    setImageSrc(fileUrl);
  }
  
  return (
    <div>
      <FileInput
        style={{ width: 500 }}
        accept={"image/*"}
        onChange={onFileChange}
        value={selectedFile}
      />
      <button onClick={uploadFile}>Upload</button>

      <div style={{width: 500, height: 500, position: "relative"}}>
        {imageSrc && <Image src={imageSrc} alt="test" fill/>}
      </div>
    </div>
  );
}

export default UploadPage;