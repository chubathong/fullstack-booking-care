
require('dotenv').config();
import nodemailer from 'nodemailer'
let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        }
    });
    let info = await transporter.sendMail({
        from: '"MaMa 👻" <helloworld@example.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Hello ✔", // Subject line    
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `<h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên booking care</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian : ${dataSend.time}</b></div>
        <div><b>Bác sĩ : ${dataSend.doctorName}</b></div>

        <p>Nếu thông tin trên là đúng sự thật,vui lòng click vào đường link bên dưới 
        để xác nhận và hoàn thành thủ tục đặt lịch khám bệnh</p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin cảm ơn</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `<h3>Hello ${dataSend.patientName}</h3>
        <p>You received this email because you booked an online medical appointment on booking care</p>
        <p>Information for scheduling medical examination:</p>
        <div><b>Time : ${dataSend.time}</b></div>
        <div><b>Doctor : ${dataSend.doctorName}</b></div>

        <p>If the above information is true, please click on the link below
        to confirm and complete the medical appointment booking procedure</p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Thank you</div>
        `
    }
    return result;
}

let getBodyHTMLEmail2 = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result =
            `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên booking care</p>
        <p>Thông tin đặt lịch khám bệnh:</p>

        <div>Xin chân thành cảm ơn</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `
        <h3>Hello ${dataSend.patientName}</h3>
        <p>You received this email because you booked an online medical appointment on booking care</p>
        <p>Information for scheduling medical examination:</p>

        <div>Thank you</div>
        `
    }
    return result;
}
let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD
                }
            });
            let info = await transporter.sendMail({
                from: '"MaMa 👻" <helloworld@example.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Hello ✔", // Subject line    
                html: getBodyHTMLEmail2(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: 'base64'
                    }
                ]
            });
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })

}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment
}