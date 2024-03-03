import patientService from "../services/PatientService";

let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body);
        return res.status(200).json(
            infor
        )

    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: error
        });
    }
}

let postVerifyBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json({
            infor
        })
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: error
        })
    }
}
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}