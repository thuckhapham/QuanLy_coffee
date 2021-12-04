import mongoose from 'mongoose'

const Shift=new mongoose.Schema({
    start: Date,
    end: Date,
    employees: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
})