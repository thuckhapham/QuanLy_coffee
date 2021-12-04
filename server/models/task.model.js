import mongoose from 'mongoose'

const TaskSchema=new mongoose.Schema({
    type:{
        type: String,
        enum: ['ORDER','PROCESSING','PROCESSED','DELIVERR']
    },
    table:{
        type: mongoose.Schema.ObjectId,
        ref: 'Table'
    },
    products:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Product'
    }],
    performer:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    finished : Boolean,
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
})