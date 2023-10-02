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
export {
    handleLogin, getAllUsers, createUser, deleteUser, editUserService,
    getAllCode, getTopDoctors, getAllDoctors, saveDetailDoctor,
    getDetailDoctor, saveBulkScheduleDoctor, getScheduleDoctorByDate
}