import mongoose from 'mongoose'

const OrderSchema=new mongoose.Schema({
    customer:{
        type: mongoose.Schema.ObjectId,
        ref : 'Customer'
    },
    products: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }],
    table : {
        type: mongoose.Schema.ObjectId,
        ref: 'Table'
    },
    discountCodes: [{
        type: mongoose.Schema.ObjectId,
        ref : 'DiscountCode'
    }],
    pay:{
        type: String,
        enum: ['cash','epay','banking']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref : 'User'
    },
    paid : Boolean,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Order', OrderSchema)

