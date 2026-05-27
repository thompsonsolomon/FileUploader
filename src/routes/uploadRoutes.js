const express = require("express");

const router = express.Router();

const upload = require("../config/multer");

const fileValidation = require("../middleware/fileValidation");

const {
  uploadFile,
  getAllFiles,
  getImages,
  deleteFile,
} = require("../controllers/uploadController");


// ================= UPLOAD =================

router.post(
  "/",
  upload.single("file"),
  fileValidation,
  uploadFile
);


// ================= GET ALL FILES =================

router.get("/files", getAllFiles);


// ================= GET IMAGES =================

router.get("/images", getImages);


// ================= DELETE FILE =================

router.delete("/delete/:public_id", deleteFile);


module.exports = router;