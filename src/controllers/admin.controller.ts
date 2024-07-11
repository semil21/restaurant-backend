import Admin from "../schemas/admin.schema";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcrypt"

const createNewAdmin = expressAsyncHandler(async (req, res) => {
    try {
        const saveRecord = Admin.create(req.body)

        if (saveRecord) {
            res.status(200).send({ response: saveRecord })
        }
        else {
            res.status(500).send({ response: 'Failed to create new admin' })
        }
    }
    catch (error) {
        res.status(500).send({ response: "Server Error, Failed to create admin" })
    }
})

const verifyAdmin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body
    try {
        const verifyUserExists = await Admin.findOne({
            email: email
        })

        if (!verifyUserExists) {
            res.status(400).send({ response: "No email Found" })
            return;
        }

        const hashedPassword = verifyUserExists.password || ''

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

export default { createNewAdmin }