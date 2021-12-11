import Discount from '../../models/discount.model'
import extend from 'lodash/extend'

const create = async(req, res) =>{
    const discount = new Discount(req.body)
    try{
        await discount.save()
        console.info("discount is saved")
        return res.status(200).json(
          discount
        )
    }
    catch(err){
        console.error(err)
        return res.status(400).json({
            error: "bad request"
        })
    }
}

const discountById = async (req, res, next ,id) =>{
    try{
        console.info(`find discount by id: ${id}`)

        let discount= await Discount.findById(id)
        if(!discount){
            console.error(`discount code: ${id} not found`)
            return res.status('400').json({
              error: "discount not found"
            })    
        }
        req.discount = discount
        console.info(`discount : ${id} found`)
        next()
    }
    catch(err){
        console.error(err)
        return res.status('400').json({
            error: "Could not retrieve discount"
        })
    }
}

const read = (req, res) => {
    console.info(`Read discount: ${req.discount.id}`)
    return res.json(req.discount)
}

const list = async (req, res) => {
    try {
      const current = parseInt(req.query.page)-1
      const pagesize = parseInt(req.query.pagesize)
      console.info('get list discount')
      let discounts = await Discount.find().select('_id percentage')

      const total = discounts.length
      console.info(`total: ${total}`)

      if(current*pagesize < discounts.length){
        discounts=discounts.slice(current*pagesize, Math.min((current+1)*pagesize,discounts.length))
      }
      else {
        discounts=[]
      }
  
      console.info('get list discount finished')
    
      res.json({
          page : (current+1) ,
          pagesize : pagesize,
          total: total,
          discounts : discounts
      })
    } catch (err) {
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}

const update = async (req, res) => {
    try {
      console.info(`update discount: ${req.discount.id}`)
      let discount = req.discount
      discount = extend(discount, req.body)
      await discount.save()
      console.info(`update discount: ${req.discount.id} finished`)
      res.json(discount)
    } catch (err) {
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}

const remove = async (req, res) => {
    try {
      console.info(`delete discount:  ${req.discount.id}`)
      let discount = req.discount
      let deletedDiscount = await discount.remove()
      console.info(`delete discount: ${req.discount.id} finished`)
      res.json(deletedDiscount)
    } catch (err) {
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}

export default {
    create,
    discountById,
    read,
    list,
    remove,
    update
}

