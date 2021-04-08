import Professor from '../models/professor.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

module.exports = {
    // Create professor account
    create: function (req, res, next) {
        Professor.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email,
            password: req.body.password},
            function (err, result) {
                if (err)
                    next(err)
                else
                    res.json({status: "success", message: "Professor Added Successfully", data:null})
            })
    },
    // Authenticate professor
    authenticate: function (res, req, next) {
        Professor.findOne({email: req.body.email}, function(err, professorInfo) {
            if (err)
                next(err)
            else {
                if (bcrypt.compareSync(req.body.password, professorInfo.password)) {
                    const token = jwt.sign({id: professorInfo}, req.app.get('secretKey'), {expiresIn: '1h'})
                    res.json({status:"success", message: "Professor Found", data:{professor: professorInfo, token:token}})
                } else {
                    res.json({status:"error", message:"Invalid Login Credentials", data:null})
                }
            }
        })
    },
}