import doctorService from "../services/DoctorService";

let getTopDoctors = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctors(+limit); //convert string to number
        return res.status(200).json(response);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: error
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server"
        });
    }
}

let saveInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server"
        })
    }
}

let getDetailDoctorById = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errorCode: 3,
                message: "missing id"
            })
        }
        let response = await doctorService.getDetailDoctorById(req.query.id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server"
        })
    }
}

let createSchedule = async (req, res) => {
    try {
        let info = await doctorService.bulkCreateSchedule(req.body)
        return res.status(200).json(info)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server"
        })
    }
}

let getScheduleByDate = async (req, res) => {
    try {
        let info = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
        return res.status(200).json(info)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server"
        })
    }
}

let getExtraInforDoctorId = async (req, res) => {
    try {
        let info = await doctorService.getExtraInforDoctorId(req.query.doctorId);
        return res.status(200).json(info)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: error
        })
    }
}
let getProfileDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(info)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: error
        })
    }
}

let getListPatientForDoctor = async (req, res) => {
    try {
        let info = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(info)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: error
        })
    }
}
let sendRemedy = async (req, res) => {
    try {
        let info = await doctorService.sendRemedy(req.body);
        return res.status(200).json(info)
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: error
        })
    }
}
module.exports = {
    getTopDoctors: getTopDoctors,
    getAllDoctors: getAllDoctors,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    createSchedule: createSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorId: getExtraInforDoctorId,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy
}