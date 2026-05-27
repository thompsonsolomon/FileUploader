🚀 SmartDev Media Upload API

A fast, reusable file upload service built with Node.js + Express + Cloudinary, designed to handle images, videos, documents, and other file types with instant CDN delivery.

This project acts as a Firebase Storage alternative backend for any frontend application (React, Vue, plain HTML, CMS, etc.).

✨ Features
📤 Upload images, videos, PDFs, ZIP, DOCX, and more
☁️ Cloud storage via Cloudinary (no local file dependency)
⚡ Fast CDN file delivery
🖼️ Automatic image optimization (WebP conversion)
📁 Organized folder structure in Cloudinary
🔗 Instant URL response after upload
🗑️ Delete files via API
📂 Fetch all files or images only
🔄 Safe for deployment (stateless backend)
🧩 Reusable across multiple projects
🏗️ Tech Stack
Node.js
Express.js
Cloudinary
Multer (memory storage)
Sharp (image optimization)
dotenv
📁 Project Structure
src/
├── config/
│   └── cloudinary.js
├── controllers/
│   └── uploadController.js
├── middleware/
│   └── fileValidation.js
├── routes/
│   └── uploadRoutes.js
├── utils/
│   └── getResourceType.js
└── server.js
⚙️ Installation
1. Clone the repo
git clone https://github.com/thompsonsolomon/FileUploader/
cd media-upload-api
2. Install dependencies
npm install
3. Setup environment variables

Create a .env file:

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

PORT=5000
4. Run the server
npm start
📡 API Endpoints
📤 Upload File
POST /upload

Body (form-data):

file: your file
📂 Get All Files
GET /upload/files
🖼️ Get Images Only
GET /upload/images
🗑️ Delete File
DELETE /upload/delete/:public_id

⚠️ Use encodeURIComponent(public_id) when calling from frontend.

📦 Example Response
{
  "success": true,
  "url": "https://res.cloudinary.com/xxx/image/upload/v123/file.webp",
  "public_id": "smartdev_uploads/image/12345",
  "resource_type": "image",
  "original_name": "photo.png"
}
💡 Usage Example (Frontend)
const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.url;
};
🧠 Use Cases
Church website media manager
E-commerce product uploads
Blog image hosting
Admin dashboards
CMS systems
Portfolio projects
🔥 Why this project matters

This is a reusable media infrastructure layer that replaces:

Firebase Storage
basic local uploads
file upload plugins

It gives you full control over:

file structure
optimization
access
deletion
scalability
🚀 Future Improvements
Authentication (API keys / JWT)
Pagination for large file sets
Folder-based UI filtering
Drag & drop uploads
File search system
Upload progress tracking
👨‍💻 Author

Built by SmartDev Forge Lead Engineer (Thompson Solomon Ayomideji)