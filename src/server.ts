import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import 'reflect-metadata';

import { StudentRoutes } from './routes/student_routes';

import {TeacherRoutes} from './routes/teacher_routes';
const app = express();
app.use(express.json());

const studentRoutes = new StudentRoutes();
app.use(studentRoutes.path, studentRoutes.router);

const teacherRoutes = new TeacherRoutes();
app.use(teacherRoutes.path, teacherRoutes.router);  


app.listen(3000, () => {
  console.log("Server has Started Sucessfully");
}); 