import Order from '../models/order.model'
import extend from 'lodash/extend'


const create = async(req,res) =>{
    const order = new Order(req.body)
    try{
        await order.save()
        console.info("order is saved")
        return res.status(200).json(
            order
        )
    }
    catch(err){
        console.error(err)
        return res.status(400).json({
            message : "bad request"
        })
    }
}

const update = async(req,res) =>{

}

const list = async(req,res) =>{

}
const read = async(req,res) =>{

}
const getOrderById = async(req,res,next,id) =>{

}

const getHistoryOrder = async(req,res) =>{

}

const checkout= async(req,res) =>{

}

export default {
    create,
    getOrderById,
    getHistoryOrder,
    checkout,
    update,
    list,
    read
}

