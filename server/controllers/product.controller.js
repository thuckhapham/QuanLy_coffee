import Product from '../models/product.model'


const create= async(req,res) =>{
    const product=new Product(req.body)
    try{
        await product.save()
        return res.status(200).json({
            message: "product is saved"
        })
    } catch(err){
        return res.status(400).json({
            error : err
        })
    }
}