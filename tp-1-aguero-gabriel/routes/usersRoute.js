import express from "express";
import { getUser, createUser, updateUser, deleteUser } from "../controller/userController.js";
import Joi from "joi";
import tokenVerify from '../middleware/auth.js';

const route =  express.Router();

const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,10}$')),
    email: Joi.string()
    .email({minDomainSegments: 2, tlds: {allow: ['com', 'ar']}}),
    imagen: Joi.string().optional()           
});

route.get('/', async (req, res) => {
    try {
        let user = await getUser();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error);
    }
});

route.post("/", (req, res) => {
    let body = req.body;

    const {error, value} = schema.validate({name: body.name, email: body.email, password: body.password, imagen: body.imagen})
    if(!error){
    let result = createUser(body);
    result
        .then((user) => { res.status(201).json(user) })
        .catch((err) => { res.status(400).json(err) })
    }else{
        res.status(400).json(error) 
    }
});


route.put("/:email", (req, res) => {
    let body = req.body;
    let result = updateUser(body, req.params.email);
    result
        .then((user) => { res.status(201).json(user) })
        .catch((error) => { res.status(400).json(error) })
});

route.delete('/:id', tokenVerify, async (req, res) => {
    try {
        let userId = req.params.id; 
        const user = await deleteUser(userId); 
        return res.status(200).json({
            message: "Usuario eliminado correctamente",
            user: user
        });
    } catch (error) {
        return res.status(404).json({
            message: "Error al eliminar el usuario",
            error: error.message
        });
    }
});


export default route;
