import { Router } from "express";
import {Request,Response} from "express";
import {TeacherController} from "../controller/teacher_controller";

export class TeacherRoutes{
    public path = "/api"
    public router = Router();
    public teacherController = new TeacherController()

    constructor () {
        this.routemethod();
    }
    public routemethod(){
        this.router.get("/",(req:Request,res:Response)=>{
            return res.send("Sucess......")})
        this.router.post("/teacher",this.teacherController.createteacher);
        this.router.get("/teacher",this.teacherController.getteacherDetails)
        this.router.get("/teacher/:id",this.teacherController.getteacherIDetails);
        this.router.put("/teacher/:id",this.teacherController.updateteacher);
        this.router.delete("/teacher/:id",this.teacherController.deleteTeacher);

    }
}

