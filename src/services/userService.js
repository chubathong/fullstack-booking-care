import axios from "../axios"

const handleLogin = (email, password) => {

    return axios.post('/api/login', { email, password });
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createUser = (data) => {
    return axios.post(`/api/create-new-user`, data);
}

const deleteUser = (userId) => {
    return axios.delete(`/api/delete-user`, {
        data: { id: userId }
    })
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCode = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`);
}

const getTopDoctors = (limitInput) => {
    return axios.get(`/api/top-doctor-home?limit=${limitInput}`);
}

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-info-doctor`, data);
}

const getDetailDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}
const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
}
const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-booking-appointment`, data);
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}
const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`);
}
const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
}

const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
}
const getAllClinic = () => {
    return axios.get(`/api/get-clinic`);
}
const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}
const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data);
}
export {
    handleLogin, getAllUsers, createUser, deleteUser, editUserService,
    getAllCode, getTopDoctors, getAllDoctors, saveDetailDoctor,
    getDetailDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate, getExtraInforDoctorById,
    getProfileDoctorById, postPatientBookAppointment, postVerifyBookAppointment,
    createNewSpecialty, getAllSpecialty, getAllDetailSpecialtyById, createNewClinic,
    getAllClinic, getAllDetailClinicById, getAllPatientForDoctor, postSendRemedy
}