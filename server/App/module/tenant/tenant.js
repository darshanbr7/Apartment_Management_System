const mongoose=require ("mongoose")
const Schema=mongoose.Schema
const tenantSchema=new Schema({
    tenantName:{
        type:String,
        required:[true,"tenant Name is reuired"],
    },
    ph_no:{
        type:String,
        required:[true,"ph_no is required"]
    },
    id_type:{
        type:String,
        required:[true,"id is requied"]
    },
    id_number:{
        type:String,
        required:[true,"Id number is required"]
    },
    image:{
        type:String,
        required:[true, "image is required"]
    },
    apartment_name:{
        type:String,
        required:[true,"apartment is required"]
    },
    room_No:{
        type:String,
        required:[true,"Room Number is required"]
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user is required"]
    },
    Date:{
        type:Date,
        default:new Date()
    }
})
const tenant=mongoose.model("tenant",tenantSchema)
module.exports=tenant