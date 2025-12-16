import { skip } from "node:test";
import {prisma} from "../config/prismaconfig"
import"dotenv/config";

export class StudentServices{
  constructor() {
    this.createStudentdts = this.createStudentdts.bind(this);
    this.getstudentDetailsdts = this.getstudentDetailsdts.bind(this);
    this.getstudentbyid = this.getstudentbyid.bind(this);
    this.updateStudentdts = this.updateStudentdts.bind(this);
    this.deleteStudentdts = this.deleteStudentdts.bind(this);



  }public async createStudentdts(req:any){
    console.log("DataBase Url==========>:", process.env.DATABASE_student_URL);
    // const url = new URL(process.env.DATABASE_student_URL!);

      const payload = req.body;
      console.log("req.body======>",payload)
      const data = {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          dateOfBirth: payload.dateOfBirth,
          grade: payload.grade,
        };
        console.log("Received student data==========>:", data);
      const processedData = await prisma.studentstbl.create({data});
      if (processedData) {
        return [true,processedData];
      } else {
        return [false,processedData];
      } }; 
  public async getstudentDetailsdts(req:any){

    const pageNo = req.query.pageno ? req.query.pageno : 1;
    const limit = req.query.limit ? req.query.limit : 10;
    const skip = (pageNo - 1) * limit;
    const take = limit;
    const search = req.query.search;
    const sortby = req.query.sortby;
    const orderBy = req.query.orderBy;
    const grade = req.query.grade;
    console.log("pageNo:",pageNo,"limit:",limit,"search:",search,"orderBy:",orderBy);
    const where : any= {};
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
      ];
    } if (grade) {
      where.grade = grade;
      }
    const baseQuery: any = {
      where,
      skip: skip, 
      take: take
      };
    if (sortby && orderBy) {
      baseQuery.orderBy = {
        [String(sortby)]: orderBy === "desc" ? "desc" : "asc",
      };
    }
    // if (pageNo && limit) {
    //   const page = parseInt(pageNo as string, 10) || 1;
    //   const lim = parseInt(limit as string, 10) || 10;
    //   const offset = (page - 1) * lim;
    //   baseQuery.skip = offset;
    //   baseQuery.take = lim;
    // }
    const studentDetails = await prisma.studentstbl.findMany({...baseQuery});
      // where: { id: studentId },
  
    if (studentDetails) {
      return [true,studentDetails];
    } else {
      return [false,studentDetails];
    }
  }
  public async getstudentalldts(req:any){
    const studentDetails = await prisma.studentstbl.findMany();
    if (studentDetails) {
      return [true,studentDetails];
    } else {
      return [false,studentDetails];
    }
  } 
  public async getstudentbyid(req:any){
    const studentId = String(req.params.id);
    const studentDetails = await prisma.studentstbl.findMany({
      where: { id: studentId },
    });
    if (studentDetails) {
      return [true,studentDetails];
    } else {
      return [false,studentDetails];
    }
  }
  public async updateStudentdts(req:any){
    const sudentId = String(req.params.id);
    const payload = req.body;
    console.log("3rd===...Update Payload======>",sudentId,"payload:",payload);

    const updatedStudent = await prisma.studentstbl.update({
      where: { id: sudentId },
      data:{
        lastName: payload.lastName,
      }
      
    });
    if (updatedStudent) {
      return [true,updatedStudent];
    } else {
      return [false,updatedStudent];
    }
  }
  public async deleteStudentdts(sudentId:string){
    const deletedStudent = await prisma.studentstbl.delete({
      where: { id: sudentId },
    });
    if (deletedStudent) {
      return [true,deletedStudent];
    } else {
      return [false,deletedStudent];
    }
  } 

}
