import jwt from "jsonwebtoken";

import * as financialRepository from "../repositories/financialRepository.js";

export async function addEvent(value,type,token){
    const user= verifyToken(token);
    if(user===null) return null
    
    await financialRepository.addEvent(user,value,type);
    return true;

}

function verifyToken(token){
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch {
        return null;
      }
}