import bcrypt from "bcrypt";

import * as userRepository from "../repositories/userRepository.js";

export async function signUp(name,email,password) {
    if (await userRepository.findUserByEmail(email)) return null;

    const hashedPassword = bcrypt.hashSync(password, 12);
    await userRepository.registerNewUser(name,email,hashedPassword)

    return true;
}