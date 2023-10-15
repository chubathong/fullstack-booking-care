import { toast } from 'react-toastify';
import { createUser, deleteUser, editUserService, getAllClinic, getAllCode, getAllDoctors, getAllSpecialty, getAllUsers, getTopDoctors, saveDetailDoctor } from '../../services/userService';
import actionTypes from './actionTypes';

// export const fetchGender = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })

export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCode("GENDER")
            if (res && res.errorCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('redux error: ', error)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPosition = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode("POSITION")
            if (res && res.errorCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('redux error: ', error)
        }
    }

}
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRole = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode("ROLE")
            if (res && res.errorCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('redux error: ', error)
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const createNewuser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createUser(data)
            if (res && res.errorCode === 0) {
                toast.success("Create a new user success")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsers())
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log('redux error: ', error)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("All")
            if (res && res.errorCode === 0) {

                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('redux fetch all users error: ', error)
        }
    }

}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

//DELETE USER

export const deleteAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUser(data)
            if (res && res.errorCode === 0) {
                toast.success("Delete user success")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsers())
            } else {
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log('redux delete error: ', error)
        }
    }
}

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data)
            if (res && res.errorCode === 0) {
                toast.success("Update user success")
                dispatch(editUserSuccess())
                dispatch(fetchAllUsers())
            } else {
                dispatch(editUserFailed());
            }
        } catch (error) {
            dispatch(editUserFailed());
            console.log('redux error: ', error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

//Doctor 
export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctors('10')
            if (res && res.errorCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.data))
            } else {
                dispatch(fetchTopDoctorsFailed());
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFailed());
            console.log('redux fetch top doctors error: ', error)
        }
    }

}

export const fetchTopDoctorsSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    dataDoctors: data
})

export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAILED
})


export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED
            })
            console.log('redux fetch all doctors error: ', error)
        }
    }

}

export const saveDetail_Doctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data)
            if (res && res.errorCode === 0) {
                toast.success("save doctor success")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("save doctor fail")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (error) {
            toast.error("save doctor fail")
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
            console.log('save doctor error: ', error)
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode("TIME")
            if (res && res.errorCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
            console.log('redux fetch all doctors error: ', error)
        }
    }
}

export const getAllRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getAllCode("PRICE")
            let resPayment = await getAllCode("PAYMENT")
            let resProvince = await getAllCode("PROVINCE")
            let resSpecialty = await getAllSpecialty()
            let resClinic = await getAllClinic()
            if (resPrice && resPrice.errorCode === 0
                && resPayment && resPayment.errorCode === 0
                && resProvince && resProvince.errorCode === 0
                && resSpecialty && resSpecialty.errorCode === 0
                && resClinic && resClinic.errorCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }

                dispatch({
                    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
                    data: data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED
            })
            console.log('redux fetch required doctors error: ', error)
        }
    }
}