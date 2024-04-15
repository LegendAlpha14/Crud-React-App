import multer from "multer";
import { Request, Response, NextFunction } from "express";

let upload:any

export function multerConfig(req:Request,res:Response,next:NextFunction) {


    
     console.log("config");

    next()
     

}


export function storeImage(req: Request, res: Response, next: NextFunction) {

    console.log(req.body);

    console.log("called");

    upload.single('image')
    next()

}