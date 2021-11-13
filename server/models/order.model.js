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
    discount: [{
        type: mongoose.Schema.ObjectId,
        ref : 'Discount'
    }],
    pay:{
        type: String,
        enum: ['cash','epay','banking']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref : 'User'
    },
    paid : {
        type : Boolean,
        default : false
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})
OrderSchema.virtual('total').get(
    function(){
        let total=0;
        this.products.forEach(element => {
           total+= element.price 
        });
        total = total*(1-this.discount/100) 
        return total
    }
)
export default mongoose.model('Order', OrderSchema)

