import mongoose from 'mongoose'
require('mongoose-double')(mongoose)
var SchemaTypes = mongoose.Schema.Types;
const DiscountCodeSchema=new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    discount:{
        type: SchemaTypes.Double,
        required: 'Discount is required',
        
    },
    category : {
        type : String,
        default : "DEFAULT",
        enum : ["DEFAULT", "MEMBER", "EVENT"]
    },
    expiry : Date,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('DiscountCode', DiscountCodeSchema)