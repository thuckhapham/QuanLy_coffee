import mongoose from 'mongoose'

const TableSchema=new mongoose.Schema({
    number: {
        type: Number,
        unique: "Number already exists",
        required: 'Number is required'
    },
    description: String,
    enable: Boolean,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Table', TableSchema)