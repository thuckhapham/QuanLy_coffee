import Customer from '../models/customer.model'
import MemberLevel from '../models/memberLevel.model'
import extend from 'lodash/extend'

const create = async(req,res) =>{
    const customer=new Customer(req.body)
    console.info(`save customer`)
    try{
        let isPhoneExists= Customer.exists({phone : customer.phone})
  
        if(isPhoneExists){
            console.error("phone already exists")
            return res.status(400).json({error : "phone already exists"})
        }
        
        
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

        const current = parseInt(req.query.page)-1
        const pagesize = parseInt(req.query.pagesize)
        const name =  req.query.name
        const phone = req.query.phone
        const created = req.query.created
        let customers= await Customer.find().select('name phone created')

        console.info(`get customers from repository success`)
        customers =customers.filter(customer =>
            (   (name===undefined || customer.name.includes(name)) 
                && (phone=== undefined || customer.phone.includes(phone))
                && (created === undefined || customer.created >= new Date(created))
            ) 
        )
        const total = customers.length
        console.info(`total: ${total}`)
        if(current*pagesize < customers.length){
            customers=customers.slice(current*pagesize, Math.min((current+1)*pagesize,customers.length))
        }
        else{
            customers=[]
        }
      
        console.info('get list customer finished')
        
        res.json({
            page : (current+1) ,
            pagesize : pagesize,
            total: total,
            customers : customers
        })
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

        const current = parseInt(req.query.page)-1
        const pagesize = parseInt(req.query.pagesize)
        const name =  req.query.name
        const phone = req.query.phone
        const created = req.query.created
        const memberlevelName =req.query.memberLevelName
        const memberlevelCode = req.query.memberLevelCode
        const email = req.query.email
        const birthday = req.query.birthday

        let members= await Customer.find({memberCode: {$exists:true}})
        .select('name phone memberCode emai birthday memberLevel created')
        .populate('memberLevel', 'name code') 
        members =members.filter(member =>
            (   (name===undefined || member.name.includes(name)) 
                && (phone=== undefined || member.phone.includes(phone))
                && (email=== undefined || member.email.includes(email))
                && (created === undefined || member.created >= new Date(created))
                && (birthday === undefined || member.birthday === new Date(birthday))
                && (memberlevelName=== undefined || member.memberLevel.name.includes(memberlevelName))
                && (memberlevelCode=== undefined || member.memberLevel.code.includes(memberlevelCode))
            ) 
        )

        const total = members.length
        console.info(total)
        if(current*pagesize < members.length){
            members=members.slice(current*pagesize, Math.min((current+1)*pagesize,members.length))
        }
        else{
            members=[]
        }

        console.info('get list members finished')

        res.json({
            current : current+1,
            pagesize : pagesize,
            total: total,
            members : members
        })
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