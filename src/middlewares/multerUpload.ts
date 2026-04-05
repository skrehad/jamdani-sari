import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({
  storage,
  // limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  limits: {
    fileSize: 10 * 1024 * 1024, // 🔥 10MB per image
    files: 7, // 🔥 maximum 7 files
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      // ✅ Pass error as the first argument, TypeScript will accept it
      return cb(
        new Error("Only image files are allowed") as unknown as null,
        false,
      );
      // or simpler: cb(new Error("Only image files are allowed") as unknown as null, false);  // workaround
    }
    cb(null, true);
  },
});
