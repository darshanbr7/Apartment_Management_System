const mongoose=require("mongoose")
const isEmail=require("validator/lib/isEmail")
const Schema=mongoose.Schema
const userSchema=new Schema({
    userName:{
        type:String,
        unique:true,
        required:[true,"username is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        validate:{
            validator:function(value){
              return isEmail(value)  
            },
            message:function(){
                return "Enter proper Email"
            }
        }
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
})

const user=mongoose.model("user",userSchema)
module.exports=user