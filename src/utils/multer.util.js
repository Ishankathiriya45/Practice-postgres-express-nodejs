const multer = require("multer");
<<<<<<< HEAD
const path = require("path");
const fs = require("fs");

let uploadDir = path.join(__dirname, "../../public/uploads/users");

// Create the folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // creates nested folders
}

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
=======

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "../../public/uploads/users"),
>>>>>>> 4eba98c (Update auth module with services)
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

module.exports = upload;
