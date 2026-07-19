const sharp = require("sharp");
const streamifier = require("streamifier");
const path = require("path");

const cloudinary = require("../config/cloudinary");
const getResourceType = require("../utils/getResourceType");

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    const resourceType = getResourceType(req.file.mimetype);

    let finalBuffer = req.file.buffer;

    // Optimize images only
    if (resourceType === "image") {
      finalBuffer = await sharp(req.file.buffer)
        .resize({
          width: 1400,
          withoutEnlargement: true,
        })
        .webp({
          quality: 80,
        })
        .toBuffer();
    }

    const originalName = path.parse(req.file.originalname).name;

    // Keep only safe filename characters
    const safeName = originalName
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    const extension = path.extname(req.file.originalname).replace(".", "");

    const options = {
      folder: smartdev_uploads/${resourceType},
      resource_type: resourceType,
      use_filename: false,
      unique_filename: false,
      overwrite: false,
      public_id:
        resourceType === "image"
          ? ${Date.now()}
          : ${Date.now()}-${safeName},
    };

    // Only images should force a format
    if (resourceType === "image") {
      options.format = "webp";
    }

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(finalBuffer).pipe(uploadStream);
    });

    console.log("Cloudinary Upload:", result);

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
      original_name: req.file.originalname,
    });
  } catch (err) {
    console.error("Upload Error:", err);

    return res.status(500).json({
      success: false,
      error: err.message || "Upload failed",
    });
  }
};    // ================= CLOUDINARY UPLOAD =================

    const result = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(

        {
          folder: `smartdev_uploads/${resourceType}`,

          resource_type: resourceType,

          use_filename: true,

          unique_filename: true,

          overwrite: false,

          public_id:
            resourceType === "image"
              ? `${Date.now()}`
              : `${Date.now()}-${originalName}`,

          format:
            resourceType === "image"
              ? "webp"
              : extension,
        },

        (error, result) => {

          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier
        .createReadStream(finalBuffer)
        .pipe(stream);
    });

    return res.status(200).json({
      success: true,

      url: result.secure_url,

      public_id: result.public_id,

      resource_type: result.resource_type,

      original_name: req.file.originalname,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Upload failed",
    });
  }
};


// ================= GET ALL FILES =================

const getAllFiles = async (req, res) => {

  try {

    const result = await cloudinary.search
      .expression("folder:smartdev_uploads/*")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    return res.status(200).json({
      success: true,
      total: result.total_count,
      files: result.resources,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch files",
    });
  }
};

// ================= GET ONLY IMAGES =================

const getImages = async (req, res) => {

  try {

    const result = await cloudinary.search
      .expression("folder:smartdev_uploads/image/*")
      .sort_by("created_at", "desc")
      .max_results(100)
      .execute();

    return res.status(200).json({
      success: true,
      total: result.total_count,
      images: result.resources,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch images",
    });
  }
};


// ================= DELETE FILE =================

const deleteFile = async (req, res) => {

  try {

    const { public_id } = req.params;

    const result = await cloudinary.uploader.destroy(
      public_id,
      {
        resource_type: "raw",
      }
    );

    // TRY IMAGE DELETE TOO

    await cloudinary.uploader.destroy(
      public_id,
      {
        resource_type: "image",
      }
    );

    // TRY VIDEO DELETE TOO

    await cloudinary.uploader.destroy(
      public_id,
      {
        resource_type: "video",
      }
    );

    return res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Delete failed",
    });
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
  getImages,
  deleteFile,
};
