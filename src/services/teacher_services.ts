import { Public } from "@prisma/client/runtime/client";
import  {prisma} from "../config/prismaconfig"
import { error } from "node:console";
export class TeacherServices{
    
	constructor() {
			this.createteacherdts = this.createteacherdts.bind(this);
			this.getteacherDetailsdts = this.getteacherDetailsdts.bind(this);
			this.getteacherbyid = this.getteacherbyid.bind(this);
			this.updateteacherdts = this.updateteacherdts.bind(this);
			this.deleteTeacherdts = this.deleteTeacherdts.bind(this);   

	}
	public async createteacherdts(req:any){
			const payload = req.body;
		try{

				console.log("Inside createteacher controller");
			const teacherscreation = await prisma.teacherstbl.create({
				data: {
					firstName: payload.firstName,
					lastName: payload.lastName,
					email: payload.email,
					phone: payload.phone,
					subject: payload.subject,
					experience: payload.experience,
				},
				});
			if (teacherscreation) {
				return[true, teacherscreation];
				} else {
				return [false, null];
				}
		} catch (error) {
			console.error("Error creating teacher:", error);
			return [false, { message: "Creating Internal Server Error", error }];
		}
	}
  public async getteacherDetailsdts(req:any){

		const pageNo = req.query.pageno ? req.query.pageno : 1;
		const limit = req.query.limit ? req.query.limit : 10;
		const skip = (pageNo - 1) * limit;
		const take = limit;
		const search = req.query.search;
		const sortby = req.query.sortby;
		const orderby = req.query.orderby;
		const subject = req.query.subject;
		console.log("pageNo:",pageNo,"limit:",limit,"search:",search,"orderby:",orderby);
		const where : any= {};
		if (search) {
			where.OR = [
				{ firstName: { contains: search, mode: "insensitive" } },
				{ lastName: { contains: search, mode: "insensitive" } },
				{ email: { contains: search, mode: "insensitive" } },
				{ phone: { contains: search, mode: "insensitive" } },
			];
		} if (subject) {
			where.subject = subject;
			}
		const baseQuery: any = {
			where,
			skip: skip, 
			take: take
		};
		if (sortby && orderby) {
			baseQuery.orderby = {
				[sortby]: orderby.toLowerCase() === "desc" ? "desc" : "asc",
			};
		}
		const teacherDetails = await prisma.teacherstbl.findMany({...baseQuery});
		const totalCount = await prisma.teacherstbl.count({ where });
		console.log("Total Count:", totalCount);
		if(teacherDetails){
			return [true,teacherDetails];
		}else{
			return [false,teacherDetails];
		}
	}
	public async getteacherbyid(req:any){
		const teacherId = String(req.params.id);
		const teacherDetails = await prisma.teacherstbl.findMany({
			where: { id: teacherId },
		});
		if (teacherDetails) {
			return [true,teacherDetails];
		} else {
			return [false,teacherDetails];
		}
	} 
	public async updateteacherdts(req:any){
		const teacherId = String(req.params.id);
		const payload = req.body;
		const updatedTeacher = await prisma.teacherstbl.update({
			where: { id: teacherId },
			data: {
				firstName: payload.firstName,
				lastName: payload.lastName,
				email: payload.email,
				phone: payload.phone,
				subject: payload.subject,
				experience: payload.experience > 0 ? payload.experience : error("Experience must be a positive number"),
			},
		});
		if (updatedTeacher) {
			return [true,updatedTeacher];
		} else {
			return [false,updatedTeacher];
		}
	}
	
	public async deleteTeacherdts(teacherId:any){

		const deletedTeacher = await prisma.teacherstbl.delete({
			where: { id: teacherId},
		});
		if (deletedTeacher) {
			return [true,deletedTeacher];
		} else {
			return [false,deletedTeacher];
		}
	}
}
