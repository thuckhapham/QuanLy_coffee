import mongoose from 'mongoose'
require('mongoose-double')(mongoose)
var SchemaTypes = mongoose.Schema.Types;
const DiscountSchema=new mongoose.Schema({
    percentage:{
        type: SchemaTypes.Double,
        required: 'percentage is required',
        
    }
})

export default mongoose.model('Discount', DiscountSchema)