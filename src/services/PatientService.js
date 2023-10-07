import db from "../models/index"
require('dotenv').config();

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errorCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    default: {
                        email: data.email,
                        roleId: 'R3'
                    },
                });
                //create booking record
                if (user && user[0]) {
                    await db.User.findOrCreate({
                        where: { patientId: user[0].id },
                        default: {
                            status: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        },
                    })
                }
                resolve({
                    errorCode: 0,
                    message: 'Save for patient succeed'
                })
            }

        } catch (error) {
            reject(error);
        }
    })
}


module.exports = {
    postBookAppointment: postBookAppointment
}