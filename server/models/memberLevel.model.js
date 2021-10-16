import mongoose from 'mongoose'

const MemberLevel= new mongoose.Schema({
    name: {
        type : String,
        trim : true,
        required : "Name is required"
    },
    code: {
        type: String,
        trim : true,
        unique: true
    },
    discount: Number,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model('MemberLevel', MemberLevel)