import * as userService from "../services/userService.js";

export async function signUp(req,res){
    try {
        const { name, email, password } = req.body;
    
        if (!name || !email || !password) {
          return res.sendStatus(400);
        }
    
        const result = await userService.signUp(name, email, password);
        if(result===null) return res.sendStatus(409)
    
        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}

export async function signIn(){
    
}