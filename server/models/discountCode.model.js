import mongoose from 'mongoose'

const DiscountCodeSchema=new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    discount:{
        type: Float64Array,
        required: 'Discount is required',
        
    },
    enable : Boolean,
    expiry : Date,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('DiscountCode', DiscountCodeSchema)