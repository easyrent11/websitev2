const multer = require("multer");
const path = require("path");
const express = require("express");
const router = express.Router();
const fs = require('fs');
const carServices = require("../services/CarServices");
const db = require('../models/db');

router.post("/uploadImages", (req, res) => {
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
    console.log(req.files);

    // If no errors occurred, we will map the files array.
    const fileUrls = req.files.map((file) => {
      const fileExtension = file.mimetype.split("/")[1];
      // extracting the url of each image from the array.
      const newFileName = `${file.filename}.${fileExtension}`;
      const newFilePath = path.join(__dirname, `../images/${newFileName}`); // Construct the new file path
      fs.renameSync(file.path, newFilePath); // Rename the file
      return `${req.protocol}://${req.get("host")}/images/${newFileName}`;
    });

    return res.json({ message: "Success", files: fileUrls });
  });
});

//Multer for uploading the car images.
const upload = multer({
  dest: path.join(__dirname, "../images"),
}).array("carpics", 20);


router.get("/getallcars", async (req, res) => {
  try {
    const carsWithImages = await carServices.getAllCarsWithImages();
    res.status(200).json(carsWithImages);
  } catch (error) {
    console.error("Error retrieving cars:", error);
    res.status(500).json({ error: "Error retrieving cars" });
  }
});

// Route to update car details
router.put("/updatecardetails", async (req, res) => {
  // Retrieve the updated car details from the request body
  const updatedCarDetails = req.body;
  console.log("Updated Details =",updatedCarDetails);

  try {
    await carServices.updateCarDetails(db, updatedCarDetails);
    res.json({ message: "Car details and image updated successfully" });
  } catch (error) {
    console.error("Error updating car details:", error);
    res.status(500).json({ message: "Failed to update car details and image" });
  }
});

module.exports = router;
