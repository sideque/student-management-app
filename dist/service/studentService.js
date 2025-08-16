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
const student_1 = __importDefault(require("../model/student"));
class StudentService {
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_1.default.find().sort({ updatedAt: -1, createdAt: -1 });
        });
    }
    addStudent(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStudent = new student_1.default(data);
            return yield newStudent.save();
        });
    }
    updateStudent(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield student_1.default.findByIdAndUpdate(id, data, { new: true });
        });
    }
    deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(id, 'id');
            return yield student_1.default.findByIdAndDelete(id);
        });
    }
    searchStudents(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query)
                return yield student_1.default.find();
            return yield student_1.default.find({ name: new RegExp(query, 'i') });
        });
    }
}
exports.default = new StudentService();
