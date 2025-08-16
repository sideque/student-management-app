import express, { Router } from 'express';
import StudentController from '../controller/studentController';

const router: Router = express.Router();
const studentController = new StudentController();

router.get('/', studentController.getMainPage);
router.post('/addStudent', studentController.addStudent);
router.post('/editStudent', studentController.editStudent);
router.delete('/delete/:id', studentController.deleteStudent);
router.get('/search/:query', studentController.searchTerm);

export default router;