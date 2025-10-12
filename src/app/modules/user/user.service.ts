import { Request } from "express";
import config from "../../../config";
import { prisma } from "../../shared/prisma";
import bcrypt from "bcryptjs";
import { fileUploader } from "../../helper/fileUploader";

const createPatient = async (req: Request) => {
  if (req.file) {
    const uploadResult = await fileUploader.uploadToCloudinary(req.file);
    console.log(uploadResult);
    req.body.patient.profilePhoto = uploadResult?.secure_url;
  }

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(config.BCRYPT_SALT_ROUND)
  );

  const result = prisma.$transaction(async (tnx) => {
    await tnx.user.create({
      data: {
        email: req.body.patient.email,
        password: hashedPassword,
      },
    });

    return await tnx.patient.create({
      data: req.body.patient,
    });
  });

  return result;
};

export const UserService = {
  createPatient,
};
