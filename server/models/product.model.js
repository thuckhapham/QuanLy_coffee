import mongoose from 'mongoose'

const ProductSchema= new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required"
    },
    price : Float64Array,
    image: {
    data: Buffer,
    contentType: String
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        enum: ['tea','coffee','cookie','cake','other']
    },
    price: {
        type: Number,
        required: "Price is required"
    }, 
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
})

export default mongoose.model('Product',ProductSchema)