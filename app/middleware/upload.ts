import multer from "multer";

// Set up multer disk storage (not needed for S3, we handle the file in memory)
const storage = multer.memoryStorage();

// Validate file type and size
const fileFilter = (
  _req: unknown,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Allowed file types (jpeg, png, jpg)
  const allowedFileTypes = /jpeg|png|jpg/;
  const isValidExtension = allowedFileTypes.test(
    file.originalname.toLowerCase()
  );
  const isValidMimeType = allowedFileTypes.test(file.mimetype);

  // Check file type
  if (isValidExtension && isValidMimeType) {
    return cb(null, true); // Accept the file
  } else {
    return cb(null, false); // Reject the file
  }
};

// Set up multer middleware to handle file uploads in memory
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter,
});
