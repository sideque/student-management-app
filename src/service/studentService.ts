import Student from "../model/student";

class StudentService {
    async getAllStudents() {
        return await Student.find().sort({ updatedAt: -1, createdAt: -1 });
    }

    async addStudent(data: any) {
        const newStudent = new Student(data);
        return await newStudent.save();
    }

    async updateStudent(id: string, data: any) {
        return await Student.findByIdAndUpdate(id, data, { new: true })
    }

    async deleteStudent(id: string) {
        console.log(id, 'id')
        return await Student.findByIdAndDelete(id);
    }

    async searchStudents(query: string) {
        if (!query) return await Student.find();
        return await Student.find({ name: new RegExp(query, 'i') });
    }
}

export default new StudentService();