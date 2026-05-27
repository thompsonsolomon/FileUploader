// src/utils/createFolders.js

const fs = require("fs");
const path = require("path");

const folders = [
  "images",
  "pdfs",
  "videos",
  "audios",
  "documents",
  "others",
];

const createFolders = () => {
  const uploadPath = path.join(__dirname, "../../uploads");

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }

  folders.forEach((folder) => {
    const folderPath = path.join(uploadPath, folder);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
  });
};

module.exports = createFolders;