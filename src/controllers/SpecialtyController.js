import specialtyService from "../services/SpecialtyService";


let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);
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

let getAllSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty();
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

let getDetailSpecialtyById = async (req, res) => {
    try {
        let data = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
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
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}