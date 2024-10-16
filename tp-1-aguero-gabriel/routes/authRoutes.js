import users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const route = express.Router();

route.post('/', (req, res) => {
    users.findOne({
        email:req.body.email
    })
    .then(data => {
        if(data){
            const validPass = bcrypt.compareSync(req.body.password, data.password)
            if(!validPass) return res.status(400).json({msj: "Contraseña incorrecta"})
            const jwToken = jwt.sign({
        users:{
            _id: data._id,
            name: data.name,
            email: data.email
        }

    },  process.env.SEED, {expiresIn: process.env.EXPIRATION})
        res.json({
            users:{
                _id: data._id,
                name: data.name,
                email: data.email
            }, jwToken
        })
        }else{
            res.status(400).json({msj: "Email incorrecto"})
        }
    })
});

export default route;