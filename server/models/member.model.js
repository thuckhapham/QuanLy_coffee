import mongoose from 'mongoose'

const MemberSchema=new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required : "Name is required"
    },
    phone: {
        type:String,
        trim:true,
        unique: "Phone already exists",
        length: 10,
        match: [/\d/g, "Please fill a valid phone number"]
    },
    birthday: Date,
    emai : String,
    memberCode: {
        type : String,
        unique : true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Member', MemberSchema)
