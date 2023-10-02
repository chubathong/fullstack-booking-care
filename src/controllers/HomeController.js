import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async(req,res) =>{
    try{
        let data = await db.User.findAll();//vì trong folder models/user -> tên User
        return res.render('homepage.ejs',{
            data:JSON.stringify(data)
        })
    }catch(e){
        console.log(e)
    }
}

let getAboutPage = async(req,res) =>{

    return res.render('about.ejs');
    
}

let getCRUD = async(req,res)=>{
    return res.render('crud.ejs');
}

let postCRUD = async(req,res)=>{
    await CRUDService.createNewUser(req.body);
    let data = await CRUDService.getAllUsers();
    return res.render('displayCRUD.ejs',{
        dataTable:data
    })
}

let displayGetCRUD = async(req,res)=>{
    let data = await CRUDService.getAllUsers();
    return res.render('displayCRUD.ejs',{
        dataTable:data
    })
}

let editCRUD =async (req,res)=>{
    let userId = req.query.id;
    if(userId){
        let userData=await CRUDService.getUserInfoById(userId)
        return res.render('editCRUD.ejs',{
            user:userData
        })
    }else{
        return res.send('user not found')
    }
}

let putCRUD = async (req,res)=>{
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    return res.render('displayCRUD.ejs',{
        dataTable:allUsers
    })
}
let deleteCRUD = async (req,res)=>{
    let id = req.query.id
    if(id){
        await CRUDService.deleteUserById(id)
        let data = await CRUDService.getAllUsers();
        return res.render('displayCRUD.ejs',{
            dataTable:data
        })
    }
    return res.send('delete fail')
}
module.exports = { 
    getHomePage: getHomePage,
    getAboutPage:getAboutPage,
    getCRUD:getCRUD,    
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    editCRUD:editCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD
}