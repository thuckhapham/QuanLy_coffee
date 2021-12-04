import Order from '../models/order.model'
import extend from 'lodash/extend'
import Product from '../models/product.model'

const create = async(req,res) =>{
    const order=new Order()
    try{
    
        order.table = req.body.table
      await order.save()
      console.info("product is saved")
      return   res.json(order)
    } catch(err){
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}

const orderByID = async (req, res, next, id) => {
    try {
      console.log(`find order: ${id}`)
  
      let order = await Order.findById(id)
      if (!order){
        console.error(`Order: ${id} not found`)
        return res.status('400').json({
          error: "Order not found"
        })
      }
      req.order = order 
      console.info(`order: ${id} found`)
      next()
    } catch (err) {
      console.error(err)
      return res.status('400').json({
        error: "Could not retrieve product"
      })
    }
}

const addProduct = async(req,res) =>{
    try {
        let order = req.order
        let product = await Product.findById(req.body.productId)
        var index= order.orderItem.findIndex(e=> e.ProductID === req.body.productId )
        if(index!=-1){
            order.orderItem[index].quantity =  parseInt(order.orderItem[index].quantity) + parseInt( req.body.quantity)
            if(order.orderItem[index].quantity<0)
            {
                order.orderItem.splice(index,1)
            }
        }
        else if(parseInt(req.body.quantity)>0) {
            order.orderItem.push({"ProductID" : product._id, "name" : product.name, "price" : product.price, "quantity" : parseInt(req.body.quantity)})
        }

        await order.save()

        return   res.json(
            {
                "order": order, 
                "total": order.total
            }
        )

    } catch (err) {
        console.error(err)
        return res.status('400').json({
          error: "Could not retrieve product"
        })
      }
}


export default {
    create,
    orderByID,
    addProduct
}


