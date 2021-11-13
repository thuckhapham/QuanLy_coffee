import mongoose from 'mongoose'


const OrderSchema=new mongoose.Schema({
    customer:{
        type: mongoose.Schema.ObjectId,
        ref : 'Customer'
    },
    orderItem: [{
       ItemId: {
           type : String,
           required : true
       },
       name: {
           type : String,
           required : true
       },
       price : {
           type : Number,
           required : true
       }
    }],
    table : {
        type: String,
    },
    discount: {
        type: Number
    },
    paymentMethod :{
        type: String,
        enum: ['cash','epay','banking']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref : 'User'
    },
    paymentResult: {
        id: String,
        status: String,
        update_time: Date
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

