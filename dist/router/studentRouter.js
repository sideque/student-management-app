"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = __importDefault(require("../controller/studentController"));
const StudentController = new studentController_1.default();
const router = express_1.default.Router();
router.get('/', StudentController.getMainPage);
router.post('/addStudent', StudentController.AddStudent);
router.post('/editStudent', StudentController.deleteStudent);
router.delete('/delete/:id', StudentController.deleteStudent);
router.get('/search/searchterm', StudentController.searchTerm);
exports.default = router;
