import bcrypt from "bcryptjs";

export const Salt = bcrypt.genSaltSync()