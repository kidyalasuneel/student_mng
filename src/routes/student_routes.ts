import { Router } from "express";
import {Request,Response} from "express";
import {StudentController} from "../controller/student_controller";

export class StudentRoutes{
    public path = "/api"
    public router = Router();
    public studentController = new StudentController()

    constructor () {
        this.routemethod();
    }
    public routemethod(){
        this.router.get("/",(req:Request,res:Response)=>{
            return res.send("Sucess......")})
        this.router.post("/student",this.studentController.createStudent);
        this.router.get("/student",this.studentController.getstudentDetails)
        this.router.get("/student/:id",this.studentController.getstudentIDetails);
        this.router.put("/student/:id",this.studentController.updateStudent);
        this.router.delete("/student/:id",this.studentController.deleteStudent);

    }
}

