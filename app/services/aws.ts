import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { ENV } from "@/config/env";

// Initialize S3 Client from AWS SDK v3
const s3Client = new S3Client({
  region: ENV.AWS_REGION,
  credentials: {
    accessKeyId: ENV.AWS_ACCESS_KEY_ID,
    secretAccessKey: ENV.AWS_SECRET_ACCESS_KEY,
  },
});

// Create a function to upload the file to S3
export const uploadToS3 = async (file: Express.Multer.File, key: string) => {
  try {
    const params = {
      Bucket: ENV.AWS_BUCKET_NAME,
      Key: key, // The filename in S3 (e.g., userId + original name)
      Body: file.buffer, // File buffer from memory storage
      ContentType: file.mimetype, // The MIME type of the file
    };

    const command = new PutObjectCommand(params);

    // Upload the file to S3
    await s3Client.send(command);

    return `https://${ENV.AWS_BUCKET_NAME}.s3.${ENV.AWS_REGION}.amazonaws.com/${key}`; // Return the S3 URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw new Error("Failed to upload file to S3");
  }
};

// Function to delete the existing profile picture from S3
export const deleteImageFromS3 = async (imageUrl: string) => {
  try {
    const key = imageUrl.split("/").pop(); // Extract the key from the image URL
    const command = new DeleteObjectCommand({
      Bucket: ENV.AWS_BUCKET_NAME,
      Key: key,
    });
    const response = await s3Client.send(command);
    if (response && response.$metadata.httpStatusCode === 204) {
      return true;
    }
    throw new Error("unable to delete image");
  } catch (err) {
    console.error("Error deleting image from S3:", err);
    throw new Error("Error deleting image from S3");
  }
};
