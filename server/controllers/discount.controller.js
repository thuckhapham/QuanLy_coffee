import DiscountCode from '../models/discountCode.model'
import extend from 'lodash/extend'

const create = async(req, res) =>{
    const discountCode = new DiscountCode(req.body)
    try{
        await discountCode.save()
        console.info("discount is saved")
        return res.status(200).json(
            discountCode
        )
    }
    catch(err){
        console.error(err)
        return res.status(400).json({
            error: "bad request"
        })
    }
}

const discountCodeById = async (req, res, next ,id) =>{
    try{
        console.trace(`find discount by id: ${id}`)

        let discountCode = await DiscountCode.findById(id)
        if(!discountCode){
            console.error(`discount code: ${id} not found`)
            return res.status('400').json({
              error: "discount code not found"
            })    
        }
        req.discountCode = discountCode
        console.info(`discount code: ${id} found`)
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
    console.info(`Read discount: ${req.discountCode.id}`)
    return res.json(req.discountCode)
}

const list = async (req, res) => {
    try {
      const current = parseInt(req.query.page)-1
      const pagesize = parseInt(req.query.pagesize)
      const category = req.query.category
      const discount = parseFloat(req.query.discount)
      const name = req.query.name
      const expiry = req.query.expiry
      console.info('get list discount code')
      let discountCodes = await DiscountCode.find().select('_id name discount category expiry')
      discountCodes.filter(discountCode =>(
        (category === undefined || discountCode.category.includes(category))
        && (discount===undefined || discountCode.discount === discount)
        && (name === undefined || discountCode.name.includes(name))
        && (expiry === undefined || discountCode.expiry >= new Date(expiry))
      ))
      const total = discountCodes.length
      console.info(`total: ${total}`)

      if(current*pagesize < discountCodes.length){
        discountCodes=discountCodes.slice(current*pagesize, Math.min((current+1)*pagesize,discountCodes.length))
      }
  
      console.info('get list discount code finished')
    
      res.json({
          page : (current+1) ,
          pagesize : pagesize,
          total: total,
          discountCodes : discountCodes
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
      console.info(`update discountCode: ${req.discountCode.id}`)
      let discountCode = req.discountCode
      discountCode = extend(discountCode, req.body)
      discountCode.updated = Date.now()
      await discountCode.save()
      console.info(`update discountCode: ${req.discountCode.id} finished`)
      res.json(discountCode)
    } catch (err) {
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}

const remove = async (req, res) => {
    try {
      console.info(`delete discountCode:  ${req.discountCode.id}`)
      let discountCode = req.discountCode
      let deletedDiscountCode = await discountCode.remove()
      console.info(`delete discountCode: ${req.discountCode.id} finished`)
      res.json(deletedDiscountCode)
    } catch (err) {
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}

export default {
    create,
    discountCodeById,
    read,
    list,
    remove,
    update
}

