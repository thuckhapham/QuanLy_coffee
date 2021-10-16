import Customer from '../models/customer.model'
import MemberLevel from '../models/memberLevel.model'
import extend from 'lodash/extend'

const create = async(req,res) =>{
    const customer=new Customer(req.body)
    console.info(`save customer`)
    try{

        await customer.save()
        console.info(`customer: ${customer.id} is saved`)

        return res.status(200).json(customer)
      
    } catch(err){
        console.error(err)
        return res.status(400).json({
            error : "bad request"
        })
    }
}
async function  membercode(){
    do{
        var r= (Math.random() + 1).toString(36).substring(2,12)
        var query = await Customer.find({memberCode: r}).limit(1)
    }
    while(query[0]===null)
    return r
   
}

const createMember = async(req,res) =>{
    console.info(`save member`)

    try{
        
        var query=await Customer.find({'phone' : req.body.phone}).limit(1)
        var member=query[0]
  

        if(member===null) member=new Customer(req.body)
        else extend(member, req.body)

        member.memberCode=await membercode()


        var memberlevel= await MemberLevel.find({'code' : req.body.memberLevelCode}).limit(1)
      
  
        if(memberlevel[0]!=null) member.memberLevel= memberlevel[0]._id
        member.updated= Date.now()
        await member.save()
   
        return res.status(200).json({'member': member})
    }
    catch(err){
        console.error(err)
        return res.status(400).json({
            error : "bad request"
        })
    }
}

const createMemberLevel= async(req,res) =>{
    const memberLevel=new MemberLevel(req.body)
    console.info(`save memberlevel`)
    try{

        await memberLevel.save()
        console.info(`memberlevel: ${memberLevel.id} is saved`)

        return res.status(200).json(memberLevel)
      
    } catch(err){
        console.error(err)
        return res.status(400).json({
            error : "bad request"
        })
    }
}

const getListCustomer = async(req,res) => {
    try{
        console.info('get list customer')
        const filters = req.query;
        let customers= await Customer.find().select('name phone')

        customers =customers.filter(customer =>{
            let isValid =true
            for (let key in filters){
                
                console.log(key, customer[key], filters[key])

                isValid = isValid && customer[key] == filters[key]
            }
            return isValid;
        })

        console.info('get list customer finished')
        res.json(customers)
    }
    catch (err) {
        console.error(err)
        return res.status(400).json(
          {error : "bad request"}
        )
    }
}

const getListMember = async(req,res) => {
    try{
        console.info('get list members')
        const filters = req.query;

        let members= await Customer.find({memberCode: {$exists:true}})
        .select('name phone memberCode emai birthday memberLevel')
        .populate('memberLevel', 'name') 
        members =members.filter(member =>{
            let isValid =true
            for (let key in filters){
                
                console.log(key, member[key], filters[key])

                isValid = isValid && member[key] == filters[key]
            }
            return isValid;
        })
        console.info('get list members finished')
        res.json(members)
    }
    catch (err) {
        console.error(err)
        return res.status(400).json(
          {error : "bad request"}
        )
    }
}
const getListMemberLevel = async(req,res) => {
    try{
        console.info('get list memberlevel')
        const filters = req.query;
        let memberLevels= await MemberLevel.find().select('_id code name discount')

        memberLevels =memberLevels.filter(memberlevel =>{
            let isValid =true
            for (let key in filters){
                isValid = isValid && memberlevel[key] == filters[key]
            }
            return isValid;
        })

        console.info('get list memberlevel finished')
        res.json(memberLevels)
    }
    catch (err) {
        console.error(err)
        return res.status(400).json(
          {error : "bad request"}
        )
    }
}


export default {
    create,
    createMember,
    createMemberLevel,
    getListCustomer,
    getListMember,
    getListMemberLevel
}