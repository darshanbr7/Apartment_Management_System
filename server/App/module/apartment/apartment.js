const mongoose=require("mongoose")
const Schema=mongoose.Schema
const apartmentSchema=new Schema({
        building_name:{
            type:String,
            reqired:[true, "Building name is required"]
        },
        rooms:{
            type:String,
            required:[true,"rooms are required"]
        },
        buildig_address:{
            type:String,
            required:[true,"building_address are required"]
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:"user",
            required:[true,"user is required"]
        },
})
const apartment=mongoose.model("apartment",apartmentSchema)
module.exports=apartment