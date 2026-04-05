import prisma from "../../utils/prismaProvider";
import { IFile } from "../../types/file.type";
import imageUploader from "../../utils/imageUploader";

const uploadImage = async (file: Express.Multer.File) => {
  const fileData: IFile = {
    path: file.path,
    originalname: file.originalname,
    mimetype: file.mimetype,
  };

  const result = await imageUploader(fileData);

  // Save to DB
  const gallery = await prisma.gallery.create({
    data: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });

  return gallery;
};

const getAllImages = async () => {
  return await prisma.gallery.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const galleryService = { uploadImage, getAllImages };
