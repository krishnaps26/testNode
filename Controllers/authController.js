const User = require("./../Models/userModel")
const jwt = require("jsonwebtoken")


// user 
exports.signUp = async(req,res)=>{
    try{
        const user = await User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            confirmPassword : req.body.confirmPassword
        })
        user.__v = undefined
        user.password = undefined

        const token = jwt.sign({id : user._id}, "secretIDDDDD", {
            expiresIn : "90d"
        }) 
        res.status(201).json({
            status: 'success',
            message: 'created successfully',
            user,
            token
        })
    }catch(err){
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

exports.login = async(req, res)=> {
    try {
        const email = req.body.email
        const password = req.body.password
        if(!email || !password) {
            return res.status(400).json({
                status : 'fail',
                message: "both are required"
            })
        }

        const user = await User.findOne({email})

        //console.log(user)

        if(!user) {
            return res.status(404).json({
                status : 'fail',
                message: "user not found"
            })
        }

        const correct = await user.correctPassword(password, user.password)

        //console.log(correct)

        if(!correct) {
            return res.status(401).json({
                status : 'fail',
                message: "incorrect password"
            })
        }

        const token = jwt.sign({id : user._id}, "secretIDDDDD", {expiresIn : "90d"})

        res.status(200).json({
            status : "success",
            message : "signed in",
            token
        })
    } catch(err) {
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}

exports.protect = async(req, res, next) => {
    try {
        if(!req.headers.auth || !(req.headers.auth.split(" ")[0] == "Bearer")){
            return res.status(401).json({
                status : "fail",
                message : "token not present"
            })
        }

        const token = req.headers.auth.split(" ")[1]
        
        const decoded = jwt.verify(token, "secretIDDDDD")

        console.log(decoded)

        const freshUser = await User.findById(decoded.id)

        console.log(freshUser)

        if(!freshUser) {
            return res.status(401).json({
                status : "fail",
                message : "user signed out"
            })
        }

        if(freshUser.changePassword(decoded.iat)){
            return res.status(401).json({
                status : "fail",
                message : "user changed password"
            })
        }

        next()
    } catch(err) {
        res.status(404).json({
            status : 'fail',
            message: err
        })
    }
}
