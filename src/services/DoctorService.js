
const db = require("../models")
require('dotenv').config();
import _, { reject } from 'lodash';
import emailService from '../services/EmailService'

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE
let getTopDoctors = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                errorCode: 0,
                data: users
            })
        } catch (error) {
            reject(error);
        }
    })
}

let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errorCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}

let checkRequiredFields = (inputData) => {
    let arrFields = ['doctorId', 'contentHTML', 'contentMarkdown', 'action',
        'selectedPrice', 'selectedPayment', 'selectedProvince', 'nameClinic',
        'addressClinic', 'note', 'specialtyId'
    ]
    let isValid = true;
    let element = '';
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputData[arrFields[i]]) {
            isValid = false;
            element = arrFields[i]
            break;
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}
let saveInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObj = checkRequiredFields(inputData);
            if (checkObj.isValid === false) {
                resolve({
                    errorCode: 1,
                    message: `Missing parameter: ${checkObj.element}`
                })
            } else {
                //upsert to Markdown
                if (inputData.action === 'CREATE') {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                } else if (inputData.action === 'EDIT') {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })

                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
                        doctorMarkdown.description = inputData.description;
                        doctorMarkdown.updatedAt = new Date();
                        await doctorMarkdown.save()
                    }
                }
                //upsert to doctor_infor table
                let doctorInfor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: inputData.doctorId,
                    },
                    raw: false
                })
                if (doctorInfor) {
                    //update
                    doctorInfor.doctorId = inputData.doctorId;
                    doctorInfor.priceId = inputData.selectedPrice;
                    doctorInfor.provinceId = inputData.selectedProvince;
                    doctorInfor.paymentId = inputData.selectedPayment;
                    doctorInfor.nameClinic = inputData.nameClinic;
                    doctorInfor.addressClinic = inputData.addressClinic;
                    doctorInfor.note = inputData.note;
                    doctorInfor.specialtyId = inputData.specialtyId;
                    doctorInfor.clinicId = inputData.clinicId;
                    await doctorInfor.save()
                } else {
                    //create
                    await db.Doctor_Infor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.selectedPrice,
                        provinceId: inputData.selectedProvince,
                        paymentId: inputData.selectedPayment,
                        nameClinic: inputData.nameClinic,
                        addressClinic: inputData.addressClinic,
                        note: inputData.note,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId,
                    })
                }
                resolve({
                    errorCode: 0,
                    message: 'Save info doctor success'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailDoctorById = (doctorId) => {
    try {
        return new Promise(async (resolve, reject) => {
            if (!doctorId) {
                resolve({
                    errorCode: 1,
                    message: "Missing parameter"
                })
            } else {
                let data = await db.User.findOne({

                    where: { id: doctorId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },

                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]

                        },
                    ],
                    raw: true,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errorCode: 0,
                    data: data
                })
            }
        })
    } catch (error) {
        reject(error)
    }
}

let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errorCode: 1,
                    message: 'Missing require pamram!'
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                //get all exist data
                let existing = await db.Schedule.findAll(
                    {
                        where: { doctorId: data.doctorId, date: data.formatedDate },
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                        raw: true
                    }
                )


                //compare different  (so sánh 2 mảng từ client và server => lấy phần tử khác biệt)
                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === b.date;
                });
                //create data
                if (toCreate && toCreate.length > 0) {
                    await db.Schedule.bulkCreate(toCreate)
                }
                resolve({
                    errorCode: 0,
                    message: 'OK'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errorCode: 1,
                    message: 'Missing required parameter'
                })
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!dataSchedule) dataSchedule = [];
                resolve({
                    errorCode: 0,
                    data: dataSchedule
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

let getExtraInforDoctorId = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errorCode: 1,
                    message: 'Missing required parameter'
                })
            } else {
                let info = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: idInput
                    },
                    attributes: {
                        exclude: ['id', 'doctorId']
                    },
                    include: [
                        { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: false,
                    nest: true
                })
                if (!info) info = {};
                resolve({
                    errorCode: 0,
                    data: info
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getProfileDoctorById = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errorCode: 1,
                    message: 'Missing required parameter'
                })
            } else {
                let data = await db.User.findOne({

                    where: { id: doctorId },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        {
                            model: db.Doctor_Infor,
                            attributes: {
                                exclude: ['id', 'doctorId']
                            },
                            include: [
                                { model: db.Allcode, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'] },
                                { model: db.Allcode, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'] },
                            ]

                        },
                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errorCode: 0,
                    data: data
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let getListPatientForDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errorCode: 1,
                    message: 'Missing required parameter'
                })
            } else {
                let data = await db.Booking.findAll({

                    where: {
                        statusId: 'S2',
                        doctorId: doctorId,
                        date: date
                    },

                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['email', 'firstName', 'address', 'gender'],
                            include: [
                                {
                                    model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'],
                                }
                            ]
                        },
                        {
                            model: db.Allcode, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi'],
                        }

                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errorCode: 0,
                    data: data
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.patientId || !data.timeType || !data.imgBase64) {
                resolve({
                    errorCode: 1,
                    message: 'Missing required parameter'
                })
            } else {
                //update  patient status
                let appointment = await db.Booking.findOne({

                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2',
                    },
                    raw: false,
                })
                if (appointment) {
                    appointment.statusId = 'S3';
                    await appointment.save()
                }
                //send email remedy
                await emailService.sendAttachment(data);
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
module.exports = {
    getTopDoctors: getTopDoctors,
    getAllDoctors: getAllDoctors,
    saveInfoDoctor: saveInfoDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorId: getExtraInforDoctorId,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy
}