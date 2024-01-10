const mongoose = require("mongoose")
const validator = require("validator")

const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "name is require"]
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique : [true, "user exists"],
        validate : [validator.isEmail, "email should be email"]
    },
    password : {
        type : String,
        required : [true, "password is required"],
        minLength : 8
    },
    confirmPassword : {
        type : String,
        required : [true, "confirm password is required"],
        validate : {
            validator : function(val) {
                return val == this.password
            },
            message : "both the password should be same"
        }
    },
    passwordChange : {
        type : Date
    }
})

userSchema.pre("save", async function(next) {
    this.confirmPassword = undefined

    this.password = await bcrypt.hash(this.password, 12)

    next()
})

userSchema.pre("save", function(next){
    if(!this.isModified("password") || !this.isNew) return next()
    this.passwordChange = Date.now() - 1000
    next()
})

userSchema.methods.changePassword = function(JWTTimeStamp) {
    if(this.passwordChange) {
        const changeTimeStamp = parseInt(this.passwordChange.getTime()/1000, 10)
        return JWTTimeStamp < changeTimeStamp
    }

    return false
}

userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword)
}



const User = mongoose.model("User", userSchema)

module.exports = User

// second branch