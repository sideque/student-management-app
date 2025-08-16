import { Request, Response } from 'express';
import StudentService from '../service/studentService';
import Student, { IStudent } from '../model/student';

class StudentController {
    async getMainPage(req: Request, res: Response): Promise<void> {
        try {
            const students = await StudentService.getAllStudents();
            res.render('home', { title: 'Student List', students });
        } catch (error) {
            res.status(500).render('home', {
                title: 'Student List',
                students: [],
                message: { type: 'error', content: 'Failed to load students' }
            });
        }
    }

    async addStudent(req: Request, res: Response): Promise<void> {
        try {
            const { name, age, email, batch, course } = req.body;
            if (!name || !email || !batch || !course || !age || isNaN(parseInt(age))) {
                const students = await StudentService.getAllStudents();
                res.json({ success: false, message: 'All fields are required and must be valid.', students });
                return;
            }

            const studentData: Partial<IStudent> = {
                name: name.trim(),
                age: parseInt(age),
                email: email.trim(),
                batch: batch.trim(),
                course: course.trim()
            };

            const existing = await Student.findOne({ email: { $regex: new RegExp(`^${studentData.email}$`, 'i') } });
            if (existing) {
                const students = await StudentService.getAllStudents();
                res.json({
                    success: false,
                    message: 'Duplicate student found with same email',
                    students
                });
                return;
            }

            await StudentService.addStudent(studentData);
            const students = await StudentService.getAllStudents();
            res.json({ success: true, students });
        } catch (error) {
            const students = await StudentService.getAllStudents();
            res.json({ success: false, message: 'Failed to add student', students });
        }
    }

    async editStudent(req: Request, res: Response): Promise<void> {
        try {
            const { id, name, age, email, batch, course } = req.body;
            const updateData: Partial<IStudent> = {
                name: name.trim(),
                age: parseInt(age),
                email: email.trim(),
                batch: batch.trim(),
                course: course.trim()
            };

            const existingStudent = await Student.findById(id);
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
                res.json({ success: false, message: 'No changes detected' });
                return;
            }

            const existingEmail = await Student.findOne({
                email: { $regex: new RegExp(`^${updateData.email}$`, 'i') },
                _id: { $ne: id }
            });
            if (existingEmail) {
                res.json({ success: false, message: 'Email already in use by another student' });
                return;
            }

            await StudentService.updateStudent(id, updateData);
            const students = await StudentService.getAllStudents();
            res.json({ success: true, message: 'Student edited successfully', students });
        } catch (error) {
            res.json({ success: false, message: 'Failed to edit student' });
        }
    }

    async deleteStudent(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const result = await StudentService.deleteStudent(id);
            if (!result) {
                res.status(404).json({ success: false, message: 'Student not found' });
            } else {
                const students = await StudentService.getAllStudents();
                res.status(200).json({ success: true, message: 'Student deleted', students });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: 'Deletion failed' });
        }
    }

    async searchTerm(req: Request, res: Response): Promise<void> {
        try {
            const query = req.params.query;
            const students = await StudentService.searchStudents(query || '');
            res.json(students);
        } catch (error) {
            res.status(500).json({ success: false, message: 'Search failed' });
        }
    }
}

export default StudentController;