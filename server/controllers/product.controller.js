import Product from '../models/product.model'


const create= async(req,res) =>{
    const product=new Product(req.body)
    try{
        await product.save()
        return res.status(200).json({
            message: "product is saved"
        })
    } catch(err){
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}

const productByID = async (req, res, next, id) => {
    try {
      console.info(`find ProductId: ${id}`)
  
      let product = await Product.findById(id)
      if (!user){
        console.info(`Product: ${id} not found`)
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
      console.info('get list product')
      let products = await Product.find().select('name category description price image')
      
      console.info('get list product finished')
  
      res.json(products)
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