import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepository from "../repositories/userRepository.js";

export async function signUp(name,email,password) {
    if (await userRepository.findUserByEmail(email)) return null;

    const hashedPassword = bcrypt.hashSync(password, 12);
    await userRepository.registerNewUser(name,email,hashedPassword)

    return true;
}

export async function signIn(email,password){
    const user = await userRepository.findUserByEmail(email)
  
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return null;
      }
  
      return jwt.sign({
        id: user.id
      }, process.env.JWT_SECRET);
}