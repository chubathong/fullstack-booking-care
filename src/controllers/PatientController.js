import patientService from '../services/PatientService'
let postBookAppointment = async (req, res) => {
    try {
        let res = await patientService.postBookAppointment(req.body);
        return res.status(200).json(res)

    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server"
        });
    }
}


module.exports = {
    postBookAppointment: postBookAppointment
}