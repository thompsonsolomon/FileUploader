// src/utils/getResourceType.js

const getResourceType = (mimetype) => {

  if (mimetype.startsWith("image")) {
    return "image";
  }

  if (mimetype.startsWith("video")) {
    return "video";
  }

  return "raw";
};

module.exports = getResourceType;