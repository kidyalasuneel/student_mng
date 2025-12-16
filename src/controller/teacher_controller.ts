import { Request, Response } from "express";
import { TeacherServices } from "../services/teacher_services"; 
import { error } from "node:console";


export class TeacherController{

  public teacherServices = new TeacherServices();

  constructor() {
    this.createteacher = this.createteacher.bind(this);
    this.getteacherDetails = this.getteacherDetails.bind(this);
    this.getteacherIDetails = this.getteacherIDetails.bind(this);
    this.updateteacher = this.updateteacher.bind(this);
    this.deleteTeacher = this.deleteTeacher.bind(this);
    

  }
  public async createteacher(req:Request,res:Response){
  
    try{
      console.log("Inside createteacher controller");
    if (!req.body.experience || req.body.experience <= 0) {
      return res.status(400).json({ message: "Experience must be a positive number" });
    }
      const result = await this.teacherServices.createteacherdts(req);
      
      if (result) {
        res.status(201).json({ message: "Teacher created successfully", teacher: result[1] });
      } else {
        res.status(500).json({ message: "Failed to create teacher" });
      }
      } catch (error) {
        res.status(500).json({ message: "Creating Internal Server Error", error });
      }
  } public async getteacherDetails(req:Request,res:Response){
    
    try{
      console.log("Inside getteacherDetails controller");
      const result = await this.teacherServices.getteacherDetailsdts(req);

      if (result) {
        res.status(200).json({ message: "Teacher details fetched successfully", teacher: result[1] }); 
      }else {
        res.status(404).json({ message: "Teacher not found" });  // Logic to get teacher details by ID
    }
    }catch (error) {
      console.error("Error fetching teacher details:", error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
    public async getteacherIDetails(req:Request,res:Response){
        console.log("Reached getteacherallDetails controller");
        try{
            console.log("Inside getteacherallDetails controller");
            const result = await this.teacherServices.getteacherbyid(req);
            if (result) {
                res.status(200).json({ message: "All Teacher details fetched successfully", teachers: result[1] }); 
            }else {
                res.status(404).json({ message: "No Teachers found" });  // Logic to get all teacher details
            }

        }catch (error) {
            console.error("Error fetching all teacher details:", error);
            res.status(500).json({ message: "Internal Server Error", error: error });
        }
        
} public async updateteacher(req:Request,res:Response){ 
    try{
        console.log("Inside updateteacher controller");
        const result = await this.teacherServices.updateteacherdts(req);
        if (result) {
            res.status(200).json({ message: "Teacher updated successfully", teacher: result[1] }); 
        }else {
            res.status(404).json({ message: "Teacher not found" });  // Logic to update teacher details
        }
    }
    catch (error) {
        console.error("Error updating teacher details:", error);
        res.status(500).json({ message: "Internal Server Error", error: error });
    }
    }
    public async deleteTeacher(req:Request,res:Response){
        try{
            console.log("Inside deleteTeacher controller");
            const teacherId = String(req.params.id);
            const result = await this.teacherServices.deleteTeacherdts(teacherId);
            if (result) {
                res.status(200).json({ message: "Teacher deleted successfully", teacher: result[1] }); 
            }else {
                res.status(404).json({ message: "Teacher not found" });  // Logic to delete teacher details
            }
        }
        catch (error) {
            console.error("Error deleting teacher details:", error);
            res.status(500).json({ message: "Internal Server Error", error: error });
        }
    }
    }         