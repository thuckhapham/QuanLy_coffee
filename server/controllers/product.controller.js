import Product from '../models/product.model'
import extend from 'lodash/extend'

const create= async(req,res) =>{
    const product=new Product(req.body)
    try{
      await product.save()
      console.info("product is saved")
      return res.status(200).json({
          message: "product is saved"
      })
    } catch(err){
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}

const productByID = async (req, res, next, id) => {
    try {
      console.trace(`find ProductId: ${id}`)
  
      let product = await Product.findById(id)
      if (!product){
        console.error(`Product: ${id} not found`)
        return res.status('400').json({
          error: "Product not found"
        })
      }
      req.product = product 
      console.info(`ProductId: ${id} found`)
      next()
    } catch (err) {
      console.error(err)
      return res.status('400').json({
        error: "Could not retrieve product"
      })
    }
}
const read = (req, res) => {
    console.info(`Read ProductId: ${req.product.id}`)
    return res.json(req.product)
}
const list = async (req, res) => {
    try {
      var current = parseInt(req.query.page)-1
      if(isNaN(current)) current=0
      var pagesize = parseInt(req.query.pagesize)
      if(isNaN(pagesize)) pagesize=10
      const name =  req.query.name
      const category = req.query.category
      const topprice = parseInt(req.query.topprice)
      const botprice = parseInt(req.query.botprice)
      console.info('get list product')
      let products = await Product.find().select('_id name category description price image')
      products.filter(product =>(
        (name===undefined || product.name.includes(name))
        && (category === undefined || product.category.includes(category))
        && (topprice===undefined || product.price <= topprice)
        && (botprice === undefined || product.price >= botprice)
      ))
      const total = products.length
      console.info(`total: ${total}`)

      if(current*pagesize < products.length){
        products=products.slice(current*pagesize, Math.min((current+1)*pagesize,products.length))
      }
      else{
        products=[]
      }
  
      console.info('get list product finished')
    
      res.json({
          page : (current+1) ,
          pagesize : pagesize,
          total: total,
          products : products
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
      console.info(`update product: ${req.product.id}`)
      let product = req.product
      product = extend(product, req.body)
      product.updated = Date.now()
      await product.save()
      console.info(`update product: ${req.product.id} finished`)
      res.json(product)
    } catch (err) {
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}
const remove = async (req, res) => {
    try {
      console.info(`delete product:  ${req.product.id}`)
      let product = req.product
      let deletedProduct = await product.remove()
      console.info(`delete product: ${req.product.id} finished`)
      res.json(deletedProduct)
    } catch (err) {
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
  }

export default {
    create,
    productByID,
    read,
    list,
    remove,
    update
}