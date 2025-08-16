import { Request, Response } from 'express';
import StudentService from '../service/studentService';
import Student from '../model/student';
import { title } from 'process';
import studentService from '../service/studentService';

class StudentController {
    async getMainPage (req: Request, res: Response) : Promise<void> {
        try {
            const student = await StudentService.getAllStudents();
            res.render("home", { title: "Student List", student });
        } catch (error) {
            res.status(500).render("home", {
                title: "Student List",
                student: [],
                message: { type: "error", content: "Failed to load students" }
            });
        }
    }

    async AddStudent(req: Request, res: Response): Promise<void> {
        try {
            const { name, age, email, batch, course } = req.body;
            if (
                !name.trim() ||
                !email.trim() ||
                !batch.trim() ||
                !course.trim() ||
                !age.trim() ||
                isNaN(parseInt(age))
            ) {
                const students = await studentService.getAllStudents();
                res.json({ success: false, message: "All fields are required and must be valid.", students });
                return;
            }

            const studentData = {
                name: name.trim(),
                age: parseInt(age),
                email: email.trim(),
                batch: batch.trim(),
                course: course.trim()
            };

            const existing = await Student.findOne({ email: { $regex: new RegExp(`^${studentData.email}$`, 'i') } });
                console.log(existing, 'any idsa fdas')
                if (existing) {
                    const students = await studentService.getAllStudents();
                    res.json({
                        success: false,
                        message: 'Duplicate student found with same email',
                        students,
                    });
                    return;
                }
                await studentService.addStudent(studentData);
                const students = await studentService.getAllStudents();
                res.json({ success: true, students })
        } catch (error: any) {
            const student = await studentService.getAllStudents();
            res.json({ success: false, message: 'failed to Add Duplicate Found', student })
        }
    }    

    async EditStudent(req: Request, res: Response) : Promise<void> {
        try {
            const { id, name, age, email, batch, course } = req.body;
            const updateData = {
                name: name.trim(),
                age: parseInt(age),
                email: email.trim(),
                batch: batch.trime(),
                course: course.trim()
            };

            const existingStudent = await Student.findById(id)
            if (!existingStudent) {
                res.json({ success: false, message: 'Student not found' });
                return;
            }
            const isSame = 
                existingStudent.name === updateData.name &&
                existingStudent.age === updateData.age &&
                existingStudent.email === updateData.email &&
                existingStudent.batch === updateData.batch &&
                existingStudent.course === updateData.course;

                if (isSame) {
                    res.json({ success: false, message: "No changes detected" });
                    return;
                }
                await studentService.updateStudent(id, updateData);
                const students = await studentService.getAllStudents();

                res.json({ success: true, message: 'student edited successfully', students })
        } catch (error) {
            res.json({ success: false, message: "Failed to edit student." })
        }
    }

    async deleteStudent(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const result = await studentService.deleteStudent(id);
            console.log(req.params.id)
            
            if (!result) {
                res.status(404).json({ success: false, message: 'Student not found' });
            } else {
                let student = await studentService.getAllStudents()
                res.status(200).json({ student, success: true, message: "Student delete" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Deletion failed" });
        }
    }

    async searchTerm(req: Request, res: Response) : Promise<void> {
        try {
            const query = req.query.q as string;
            const student = await studentService.searchStudents(query || "");
            res.json(student);
        } catch (error) {
            res.status(500).json({ error: "Search failed" });
        }
    }
}

export default StudentController;