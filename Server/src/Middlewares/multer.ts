import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the storage strategy for Multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    // Set the destination folder to 'uploads' inside the 'src' directory
    callback(null, path.resolve(__dirname, "../uploads"));
  },
  filename: function (req, file, callback) {
    // Generate a unique name for the file
    const id = uuid();
    const extName = path.extname(file.originalname); // Extracts file extension
    callback(null, `${id}${extName}`);
  },
});

// Export the single file upload middleware
export const singleUpload = multer({ storage }).single("photo");
