import express from "express";
import User from "../models/userModel"
import {getToken} from "../util";

const  router = express.Router();
router.post("/signin",async (req, res) => {

    console.log( 'signup ')
    const signinUser = await User.findOne({
        email:         req.body.email,
        password:      req.body.password
    });
    if (signinUser)
        res.send({
            id:        signinUser.id,
            name:      signinUser.name,
            email:     signinUser.email,
            isAdmin:   signinUser.isAdmin,
            token:     getToken(signinUser)
        })


    else
        res.status(401).send({message: "Email/senha invalida" })
})
router.post("/register",async (req, res) => {
    console.log( 'register ')
    try {

        const registerUser = new User({
            name:        req.body.name ,
            email:       req.body.email,
            password:    req.body.password,
        });
        const newRegister = await  registerUser.save();
        if(newRegister)
            res.send({
                id:        newRegister.id,
                name:      newRegister.name,
                email:     newRegister.email,
                isAdmin:   newRegister.isAdmin,
                token:     getToken(newRegister)
            })


    }catch (e) {
        res.send({msg: 'Dados de usuário inválido'});
    }


})
router.get("/createadmin", async (req, res) => {
    try {
        const  user = new User({
            name:         'Renato Lima',
            email:        'renatossrs@gmail.com',
            password:     'developer098',
            IsAdmin:      true
        });

        const newUser = await  user.save();
        res.send(newUser);

    }catch (e) {
        res.send({msg: e.message});
    }
})

export default router;