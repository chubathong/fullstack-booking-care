import express from "express";
import homeController from "../controllers/HomeController";
import userController from "../controllers/UserController";
import doctorController from "../controllers/DoctorController";
import patientController from "../controllers/PatientController";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    // router.get('/',(req,res)=>{
    //     return res.send('Hello world with Phat')
    // })
    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);
    //rest api
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    //all code
    router.get('/api/allcode', userController.getAllCode);
    //doctor
    router.get('/api/top-doctor-home', doctorController.getTopDoctors);
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);
    router.post('/api/save-info-doctor', doctorController.saveInfoDoctor);

    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    router.post('/api/bulk-create-schedule', doctorController.createSchedule);
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorId);
    router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);

    //patient
    router.get('/api/patient-book-appointment', patientController.postBookAppointment);
    return app.use("/", router);
}

module.exports = initWebRoutes;