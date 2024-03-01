import db from "../models/index"
require('dotenv').config();
import emailService from './EmailService'
import { v4 as uuidv4 } from 'uuid'

//uuid  library -> tạo ra 1 chuỗi token ngẫu nhiên
let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType
                || !data.date || !data.selectedGender || !data.address
                || !data.fullName) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                let token = uuidv4();
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    },
                });
                //create booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        }
                    })
                }
                resolve({
                    errorCode: 0,
                    message: 'Save infor patient succeed!'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}

let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();

                    resolve({
                        errorCode: 0,
                        message: 'Update the appointment succeed!'
                    })
                } else {
                    resolve({
                        errorCode: 2,
                        message: 'Appointment has been activated or does not exist'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}


module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment
}