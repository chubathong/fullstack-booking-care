
const db = require("../models")
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

let handleLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true
                });
                if (user) { // find email
                    let check = await bcrypt.compareSync(password, user.password);// compare password
                    if (check) {
                        userData.errorCode = 0;
                        userData.message = "ok";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errorCode = 3;
                        userData.message = "wrong password";
                    }
                } else {
                    userData.errorCode = 2;
                    userData.message = "User not found"
                }
            } else {
                userData.errorCode = 1;
                userData.message = 'your email isnt exist in system'
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ // ham findOne ko tim thay ->return undefined
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }

    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                })
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errorCode: 1,
                    message: 'Your email is already exist'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
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

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: inputId }
            })
            if (!user) {
                resolve({
                    errorCode: 2,
                    message: 'not found user'
                })
            }
            await db.User.destroy({
                where: { id: inputId }
            });
            resolve({
                errorCode: 0,
                message: 'user deleted'
            })

        } catch (error) {
            reject(error)
        }
    })

}
let editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errorCode: 2,
                    message: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.email = data.email;
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                if (data.avatar) {
                    user.image = data.avatar;
                }

                await user.save();

                //let allUsers = await db.User.findAll(); 
                resolve({
                    errorCode: 0,
                    message: 'Update user xù xét'
                });
            } else {
                resolve({
                    errorCode: 1,
                    message: 'User not found'
                });
            }
        } catch (error) {
            reject(error)
        }
    })

}
let getAllCode = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errorCode: 1,
                    message: 'Missing require parameter'
                })
            } else {
                let res = {};
                let allCode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errorCode = 0;
                res.data = allCode
                resolve(res)
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    handleLogin: handleLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getAllCode: getAllCode
}