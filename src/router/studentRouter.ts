import express from 'express';
import studentController from '../controller/studentController';
const StudentController = new studentController();
const router = express.Router();

router.get('/', StudentController.getMainPage);
router.post('/addStudent', StudentController.AddStudent);
router.post('/editStudent', StudentController.deleteStudent);
router.delete('/delete/:id', StudentController.deleteStudent);
router.get('/search/searchterm', StudentController.searchTerm);

export default router;
