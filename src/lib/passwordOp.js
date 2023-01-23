import bcrypt from "bcryptjs";

export const hashPassword = password => bcrypt.hash(password,  bcrypt.genSaltSync(10));
export const comparePassword = (password, dbPassword) =>
  bcrypt.compare(password, dbPassword);

export const isPasswordChanged = (jwtExpiresTime, passwordChangedAt) =>
  passwordChangedAt > jwtExpiresTime;
  
  