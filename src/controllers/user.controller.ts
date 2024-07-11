import User from "../schemas/user.schema"
import { Request, response, Response } from "express"
import bcrypt from "bcrypt"
import expressAsyncHandler from "express-async-handler";


const createNewUser = expressAsyncHandler(async (req, res) => {
    try {
        const saveUser = await User.create(req.body)

        if (saveUser) {
            res.status(200).send({ response: saveUser })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to create user" })
    }
})

const userLogin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        const verifyUserExists = await User.findOne({
            email: email
        })

        if (!verifyUserExists) {
            res.status(400).send({ response: "No email Found" })
            return;
        }

        const hashedPassword = verifyUserExists.password;

        const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

        if (isPasswordCorrect) {
            res.status(200).send({ response: verifyUserExists })
        }
        else {
            res.status(400).send({ response: "Incorrect Password" })
        }
    }
    catch (error) {
        res.status(500).send({ response: 'Server Error, Failed to log in' })
    }
})

const updateUser = expressAsyncHandler(async (req, res) => {
    const { userId } = req.params
    const data = req.body
    try {
        const updateRecord = await User.findOneAndUpdate(
            { _id: userId },
            data,
            { new: true }
        )

        if (updateRecord) {
            res.status(200).send({ response: updateRecord })
        }
        else {
            res.status(400).send({ response: 'Failed to update record' })

        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ response: 'Server Error, Failed to update user' })
    }
})


export default { createNewUser, userLogin, updateUser }
