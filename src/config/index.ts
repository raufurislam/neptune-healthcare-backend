// // config/index.ts
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config({ path: path.join(process.cwd(), ".env") });

// export default {
//   node_env: process.env.NODE_ENV,
//   port: process.env.PORT,
//   database_url: process.env.DATABASE_URL,
//   BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
//   cloudinary: {
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//   },
//   JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
//   JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
//   JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
//   JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
// };

// config/index.ts
function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
}

export default {
  node_env: getEnvVar("NODE_ENV"),
  port: getEnvVar("PORT"),
  database_url: getEnvVar("DATABASE_URL"),
  BCRYPT_SALT_ROUND: getEnvVar("BCRYPT_SALT_ROUND"),
  cloudinary: {
    api_secret: getEnvVar("CLOUDINARY_API_SECRET"),
    cloud_name: getEnvVar("CLOUDINARY_CLOUD_NAME"),
    api_key: getEnvVar("CLOUDINARY_API_KEY"),
  },
  JWT_ACCESS_EXPIRES: getEnvVar("JWT_ACCESS_EXPIRES"),
  JWT_ACCESS_SECRET: getEnvVar("JWT_ACCESS_SECRET"),
  JWT_REFRESH_SECRET: getEnvVar("JWT_REFRESH_SECRET"),
  JWT_REFRESH_EXPIRES: getEnvVar("JWT_REFRESH_EXPIRES"),
  openRouterApiKey: getEnvVar("OPENROUTER_API_KEY"),
};
