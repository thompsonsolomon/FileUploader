// src/utils/getFileTypeFolder.js

const getFileTypeFolder = (mimetype) => {

  if (mimetype.startsWith("image")) {
    return "images";
  }

  if (mimetype === "application/pdf") {
    return "pdfs";
  }

  if (mimetype.startsWith("video")) {
    return "videos";
  }

  if (mimetype.startsWith("audio")) {
    return "audios";
  }

  if (
    mimetype.includes("document") ||
    mimetype.includes("word") ||
    mimetype.includes("sheet")
  ) {
    return "documents";
  }

  return "others";
};

module.exports = getFileTypeFolder;