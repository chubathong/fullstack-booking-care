import clinicService from "../services/ClinicService";

let createClinic = async (req, res) => {
    try {
        let infor = await clinicService.createClinic(req.body);
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

let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(
            infor
        );
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: error
        });
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let data = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(
            data
        );
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: error
        });
    }
}


module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}