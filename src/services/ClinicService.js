const db = require("../models")

let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address || !data.descriptionHTML || !data.descriptionMarkdown || !data.imageBase64) {
                resolve({
                    errorCode: 1,
                    message: 'Missing required parameter'
                })
            } else {
                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errorCode: 0,
                    message: 'ok'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getAllClinic = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Clinic.findAll({

            });
            if (data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                message: 'ok',
                errorCode: 0,
                data
            })
        } catch (error) {
            reject(error)
        }
    })
}

let getDetailClinicById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({

                    errorCode: 1,
                    message: 'Missing parameter',
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
                })

                if (data) {
                    let doctorClinic = [];
                    doctorClinic = await db.Doctor_Infor.findAll({
                        where: { clinicId: inputId },
                        attributes: ['doctorId', 'provinceId']
                    })
                    data.doctorClinic = doctorClinic;
                } else {
                    data = {}
                }

                resolve({
                    message: 'ok',
                    errorCode: 0,
                    data
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById
}