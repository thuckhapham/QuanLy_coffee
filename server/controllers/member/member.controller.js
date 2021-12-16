import Member from '../../models/member.model'
import extend from 'lodash/extend'


const create = async (req, res) => {
  const member = new Member(req.body)
  try {
    await member.save()
    console.info(`Member: ${member.name} is registed`)
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json(
      {error : "bad request"}
    )
  }
}

/**
 * Load user and append to req.
 */
const memberByID = async (req, res, next, id) => {
  try {
    console.info(`find memberId: ${id}`)

    let member = await Member.findById(id)
    if (!member){
      console.error(`memberId: ${id} not found`)
      return res.status('400').json({
        error: "member not found"
      })
    }
    req.member = member
    console.error(`MemberId: ${id} found`)
    next()
  } catch (err) {
    return res.status(400).json(
      {error : "bad request"}
    )
  }
}

const read = (req, res) => {

  console.info(`Read member: ${req.member.id}`)
  return res.json(req.member)
}

const list = async (req, res) => {
  try {
    console.info('get list member')
    var current = parseInt(req.query.page)-1
    if(isNaN(current)) current=0
    var pagesize = parseInt(req.query.pagesize)
    if(isNaN(pagesize)) pagesize=10
    const phone =  req.query.phone
    const name =  req.query.name

    let members = await Member.find().select()
    members=  members.filter(member =>(
      (name===undefined || member.name.includes(name))
      (name===undefined || member.name.includes(phone))
    ))
    const total = members.length

    if(current*pagesize < members.length){
      members=members.slice(current*pagesize, Math.min((current+1)*pagesize,members.length))
    }
    else{
      members=[]
    }
    console.info('get list member finished')

    res.json({
      page : (current+1) ,
      pagesize : pagesize,
      total: total,
      members : members
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
    console.info(`update member: ${req.members.id}`)
    let member = req.member
    member = extend(member, req.body)
    member.updated = Date.now()
    await member.save()
    
    console.info(`update user: ${req.member.id} finished`)
    res.json(member)
  } catch (err) {
    console.error(err)
    return res.status(400).json(
      {error : "bad request"}
    )
  }
}

const remove = async (req, res) => {
  try {
    console.info(`delete member:  ${req.member.id}`)
    let member = req.member

    console.info(`delete user: ${req.member.id} finished`)
    res.json(member)
  } catch (err) {
    console.error(err)
    return res.status(400).json(
      {error : "bad request"}
    )
  }
}
const getMemberByPhoneorEmail = async(req,res) =>{
  try{
    let query = req.body.query 
    let member = await Member.findOne({$or:[{phone: query}, {email: email}]})
    if(!member) {
      return res.status(400).json({
        message : "member not found"
      })
    }
    return res.json(member)
  }
  catch(err){
    return res.status(400).json(
      {error : "bad request"}
    )
  }
}


export default {
  create,
  memberByID,
  read,
  list,
  remove,
  update,
  getMemberByPhoneorEmail
}