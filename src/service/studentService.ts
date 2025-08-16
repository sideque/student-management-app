import Student, { IStudent } from '../model/student';

class StudentService {
    async getAllStudents(): Promise<IStudent[]> {
        return await Student.find().sort({ updatedAt: -1, createdAt: -1 });
    }

    async addStudent(data: Partial<IStudent>): Promise<IStudent> {
        const newStudent = new Student(data);
        return await newStudent.save();
    }

    async updateStudent(id: string, data: Partial<IStudent>): Promise<IStudent | null> {
        return await Student.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteStudent(id: string): Promise<IStudent | null> {
        return await Student.findByIdAndDelete(id);
    }

    async searchStudents(query: string): Promise<IStudent[]> {
        if (!query) return await Student.find();
        return await Student.find({
            $or: [
                { name: new RegExp(query, 'i') },
                { email: new RegExp(query, 'i') },
                { course: new RegExp(query, 'i') },
                { batch: new RegExp(query, 'i') }
            ]
        });
    }
}

export default new StudentService();