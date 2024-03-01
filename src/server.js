import express from "express";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connnectDB from "./config/connnectDB"
import bodyParser from "body-parser";

import cors from 'cors';

require('dotenv').config(); // để chạy process.env


let app = express();


//config app
//app.use(cors({ origin:true })); 
app.use(cors({ credentials: true, origin: true }));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
viewEngine(app);
initWebRoutes(app);
connnectDB();

let port = process.env.PORT || 6969;//port = undefined =>port = 6969

app.listen(port, () => {
    //call back function
    console.log('backend nodejs is running on port ' + port)
})