import userService from "../services/UserService";


let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json(
            {
                errorCode: 1,
                message: 'missing input parameter'
            }
        )
    }

    let userData = await userService.handleLogin(email, password)
    return res.status(200).json(
        {
            errorCode: userData.errorCode,
            message: userData.message,
            user: userData.user ? userData.user : {}
        }
    )
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //all,id

    if (!id) {
        return res.status(200).json({
            errorCode: 0,
            message: 'Missing required parameter',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errorCode: 0,
        message: 'ok',
        users
    })

}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async (req, res) => {
    if (!req.body) {
        return res.status(200).json({
            errorCode: 1,
            message: "Missing parameter required"
        });
    }
    let message1 = await userService.editUser(req.body);
    return res.status(200).json(message1);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errorCode: 1,
            message: "Missing parameter required"
        });
    }
    let message1 = await userService.deleteUser(req.body.id);
    return res.status(200).json(message1);
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCode(req.query.type);
        return res.status(200).json(data);
    } catch (error) {
        console.log('get all code error', error)
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server"
        });
    }

}



module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode: getAllCode

}