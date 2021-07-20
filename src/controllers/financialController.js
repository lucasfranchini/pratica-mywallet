import * as financialService from "../services/financialService.js";

export async function addEvent(req,res){
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split('Bearer ')[1];
    
        if (!token) {
          return res.sendStatus(401);
        }
    
        const { value, type } = req.body;
    
        if (!value || !type) {
          return res.sendStatus(400);
        }
    
        if (!['INCOME', 'OUTCOME'].includes(type)) {
          return res.sendStatus(400);
        }
    
        if (value < 0) {
          return res.sendStatus(400);
        }
        const result = await financialService.addEvent(value, type,token);
        if(result===null) return res.sendStatus(401);

        res.sendStatus(201);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
}