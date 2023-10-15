import patientService from "../services/PatientService";

let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body);
        return res.status(200).json(
            infor
        )

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server"
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
        console.log(error)
        return res.status(200).json({
            errorCode: -1,
            message: 'Error from server'
        })
    }
}
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}