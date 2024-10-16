import usersModel from "../models/usersModel.js";
import bcrypt from 'bcrypt';

async function getUser() {
    let users = await usersModel.find();
    return users;
};

async function createUser(body) {
    let newUser = new usersModel({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        imagen: body.imagen
    });
    return await newUser.save();
}

async function updateUser(id, body){
   let user = await usersModel.findByIdAndUpdate(id,{
    $set:{
            name: body.name,
            email: body.email,
            password: body.password,
            imagen: body.imagen
            }
        })
    
    return user;
}

async function deleteUser(id) {
    try {
        const userDeleted = await usersModel.findByIdAndDelete(id);
        if (!userDeleted) {
            throw new Error("Usuario no encontrado");
        }
        return userDeleted;
    } catch (error) {
        throw new Error(error.message);
    }
}

export {getUser, createUser, updateUser, deleteUser}