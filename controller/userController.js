const { dbExecution } = require('../model')
const jwt = require("jsonwebtoken");


require('dotenv').config

const login = async(req, res) => {
    try {
        console.log(req.body);

        let query = `select * from user_details where email=?`
        let list=[req.body.email]

        const result = await dbExecution(query, list);

        console.log(result)

        if (result[0].password !== req.body.password) {
            return res.status(400).json({
                error: [{ message: "Login Failed", errorcode: 400 }],
            });
        }

        const authToken = jwt.sign(
            { id: result[0].id, user_type: result[0].user_type },
            process.env.ADIP_SECRET, {
                expiresIn: '1h'
            }
        );
        return res.status(200).json({ token : authToken, user_type: result[0].user_type});
    } catch (error) {
        return res.status(500).json({ msg : "login failed"});
    }
}
const Professionallogin = async(req, res) => {
    try {
        console.log("hospital details")
        console.log(req.body);

        let query = `select * from hospital_list where email=?`
        let list=[req.body.email]

        const result = await dbExecution(query, list);

        console.log(result)

        if (result[0].password !== req.body.password) {
            return res.status(400).json({
                error: [{ message: "Login Failed", errorcode: 400 }],
            });
        }

        const authToken = jwt.sign(
            { id: result[0].id},
            process.env.ADIP_SECRET, {
                expiresIn: '1h'
            }
        );
        return res.status(200).json({ token : authToken});
    } catch (error) {
        return res.status(500).json({ msg : "login failed"});
    }
}

module.exports = {login,Professionallogin}