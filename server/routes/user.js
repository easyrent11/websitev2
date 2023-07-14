const express = require('express');
const router = express.Router();
const UserServices = require('../services/UserServices');
const multer = require('multer');
const path = require('path');
const db = require('../models/db');
const fs = require('fs');
// register route.
router.post("/register", async (req, res) => {
  const userData = req.body;
  try {
    const result = await UserServices.registerUser(db, userData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
});


// login route.

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await UserServices.loginUser(db, email, password);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(401).json({ message: "Invalid credentials" });
  }
});


router.post("/uploadProfileImage", (req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during file upload
        console.error(err);
        return res.status(500).json({ message: "File upload error" });
      } else if (err) {
        // An unknown error occurred during file upload
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
  
      // Check if a file was uploaded
      const file = req.file;
      if (!file) {
        return res.status(400).json({ message: "No file provided" });
      }
  
      //  If no errors occured , Process the uploaded file
      const fileExtension = file.mimetype.split("/")[1];
      const newFileName = `${file.filename}.${fileExtension}`;
      const newFilePath = path.join(__dirname, "../images", newFileName);
      fs.renameSync(file.path, newFilePath);
  
      const fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/images/${newFileName}`;
  
      return res.json({ message: "Success", fileUrl });
    });
  });




router.post("/addcar", async (req, res) => {
  const carData = req.body;
  try {
    const result = await UserServices.addCar(db, carData);
    res.status(200).json({message:'Successfully added car', result:result});
  } catch (error) {
    res.status(500).json({ error: "Failed to add car" });
  }
});


// multer for uploading 1 single profile picture.  
const upload = multer({
  dest: path.join(__dirname, "../images"),
}).single("profileImage");
  
module.exports = router;
  