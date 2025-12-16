import { Request, Response } from "express";
import { StudentServices } from "../services/student_services";

export class StudentController{

  public studentServices = new StudentServices();

  constructor() {
    this.createStudent = this.createStudent.bind(this);
    this.getstudentDetails = this.getstudentDetails.bind(this);
    this.getstudentIDetails = this.getstudentIDetails.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    

  }
  public async createStudent(req:Request,res:Response){
    try{
      console.log("Inside createStudent controller");
    const result = await this.studentServices.createStudentdts(req);
    console.log("request====>> :",req.body);
    
    if (result) {
      res.status(201).json({ message: "Student created successfully", student: result });
    } else {
      res.status(500).json({ message: "Failed to create student" });
    }
    } catch (error) {
      res.status(500).json({ message: "Creating Internal Server Error", error });
    }
  }
  public async getstudentDetails(req:Request,res:Response){
    
    try{
      console.log("Inside getstudentDetails controller");
      const result = await this.studentServices.getstudentDetailsdts(req);
            console.log("Inside getstudentDetails controller22222222222222");

      if (result) {
        res.status(200).json({ message: "Student details fetched successfully", student: result[1] }); 
      }else {
        res.status(404).json({ message: "Student not found" });  // Logic to get student details by ID
      }
    }catch (error) {
      console.error("Error fetching student details:", error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }public async getstudentIDetails(req:Request,res:Response){
    console.log("Reached getstudentallDetails controller");
    try{
      console.log("Inside getstudentallDetails controller");
      const result = await this.studentServices.getstudentbyid(req);
      if (result) {
        res.status(200).json({ message: "All Student details fetched successfully", students: result[1] }); 
      }else {
        res.status(404).json({ message: "No Students found" });  // Logic to get all student details
      }

    }catch (error) {
      console.error("Error fetching all student details:", error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
  public async updateStudent(req:Request,res:Response){
    console.log("2222request=====>:",req.body);
    

    const result = await this.studentServices.updateStudentdts(req);
    if (result) {
      res.status(200).json({ message: "Student updated successfully", student: result });
    } else {
      res.status(500).json({ message: "Failed to update student" });
    }
  }
  public async deleteStudent(req:Request,res:Response){
    const sudentId = req.params.id;
    console.log("2222request=====>:",req.params.id);

    const result = await this.studentServices.deleteStudentdts(sudentId);
    if (result) {
      res.status(200).json({ message: "Student deleted successfully" });
    } else {
      res.status(500).json({ message: "Failed to delete student" });
    }
  }
}