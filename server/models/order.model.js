import mongoose from 'mongoose'

const OrderSchema=new mongoose.Schema({
    orderItem: [{
        ProductID: {
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
        },
        quantity : {
            type : Number
        }
    }],
    table : {
        type: String,
    },
    discount: {
        type: Number
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref : 'User'
    },
    payment: {
        paymentMethod :{
            type: String,
            enum: ['cash','epay','banking']
        },
        status: { type: Boolean, default: false}
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
        this.orderItem.forEach(element => {
           total+= element.price * element.quantity
        });
     
        return total
    }
)

export default mongoose.model('Order', OrderSchema)

