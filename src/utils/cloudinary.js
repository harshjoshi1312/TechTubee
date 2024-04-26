import { v2 } from "cloudinary";
import { response } from "express";
import fs from "fs";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// FILE UPLOAD AND unlink method

const uploadfile = async (localfilePath) =>{
  try {
    if (!localfilePath) return null
    //for upload
  cloudinary.uploader.upload(localfilePath,{
    resource_type:"auto"
  })
  //file has been uploaded successfully!
  console.log("file is uploaded on cloudinary");
  return response
  } catch (error) {
    fs.unlinkSync(localfilePath) // removes locally save file
  }

}
cloudinary.uploader.upload(
  "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" },
  function (error, result) {
    console.log(result);
  }
);
//steps for take file- stores in local -upload -
// remove form local
