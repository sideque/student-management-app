"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const studentService_1 = __importDefault(require("../service/studentService"));
const student_1 = __importDefault(require("../model/student"));
const studentService_2 = __importDefault(require("../service/studentService"));
class StudentController {
    getMainPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield studentService_1.default.getAllStudents();
                res.render("home", { title: "Student List", student });
            }
            catch (error) {
                res.status(500).render("home", {
                    title: "Student List",
                    student: [],
                    message: { type: "error", content: "Failed to load students" }
                });
            }
        });
    }
    AddStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, age, email, batch, course } = req.body;
                if (!name.trim() ||
                    !email.trim() ||
                    !batch.trim() ||
                    !course.trim() ||
                    !age.trim() ||
                    isNaN(parseInt(age))) {
                    const students = yield studentService_2.default.getAllStudents();
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
                const existing = yield student_1.default.findOne({ email: { $regex: new RegExp(`^${studentData.email}$`, 'i') } });
                console.log(existing, 'any idsa fdas');
                if (existing) {
                    const students = yield studentService_2.default.getAllStudents();
                    res.json({
                        success: false,
                        message: 'Duplicate student found with same email',
                        students,
                    });
                    return;
                }
                yield studentService_2.default.addStudent(studentData);
                const students = yield studentService_2.default.getAllStudents();
                res.json({ success: true, students });
            }
            catch (error) {
                const student = yield studentService_2.default.getAllStudents();
                res.json({ success: false, message: 'failed to Add Duplicate Found', student });
            }
        });
    }
    EditStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, age, email, batch, course } = req.body;
                const updateData = {
                    name: name.trim(),
                    age: parseInt(age),
                    email: email.trim(),
                    batch: batch.trime(),
                    course: course.trim()
                };
                const existingStudent = yield student_1.default.findById(id);
                if (!existingStudent) {
                    res.json({ success: false, message: 'Student not found' });
                    return;
                }
                const isSame = existingStudent.name === updateData.name &&
                    existingStudent.age === updateData.age &&
                    existingStudent.email === updateData.email &&
                    existingStudent.batch === updateData.batch &&
                    existingStudent.course === updateData.course;
                if (isSame) {
                    res.json({ success: false, message: "No changes detected" });
                    return;
                }
                yield studentService_2.default.updateStudent(id, updateData);
                const students = yield studentService_2.default.getAllStudents();
                res.json({ success: true, message: 'student edited successfully', students });
            }
            catch (error) {
                res.json({ success: false, message: "Failed to edit student." });
            }
        });
    }
    deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield studentService_2.default.deleteStudent(id);
                console.log(req.params.id);
                if (!result) {
                    res.status(404).json({ success: false, message: 'Student not found' });
                }
                else {
                    let student = yield studentService_2.default.getAllStudents();
                    res.status(200).json({ student, success: true, message: "Student delete" });
                }
            }
            catch (error) {
                res.status(500).json({ success: false, message: "Deletion failed" });
            }
        });
    }
    searchTerm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = req.query.q;
                const student = yield studentService_2.default.searchStudents(query || "");
                res.json(student);
            }
            catch (error) {
                res.status(500).json({ error: "Search failed" });
            }
        });
    }
}
exports.default = StudentController;
