import Table from '../models/table.model'
import extend from 'lodash/extend'

const create = async(req, res) =>{
    const table = new Table(req.body)
    try{

        const istablePoinExists = await Table.exists({tablePoin : table.tablePoin})
        if(istablePoinExists){
            console.error("tablePoin already exists")
            return res.status(400).json({error : "tablePoin already exists"})
        }

        await table.save()
        console.info("table is saved")
        return res.status(200).json(
            table
        )
    }
    catch(err){
        console.error(err)
        return res.status(400).json({
            error: "bad request"
        })
    }
}

const tableById = async (req, res, next ,id) =>{
    try{
        console.trace(`find table by id: ${id}`)

        let table = await Table.findById(id)
        if(!table){
            console.error(`table: ${id} not found`)
            return res.status('400').json({
              error: "table not found"
            })    
        }
        req.table = table
        console.info(`tablePoin: ${id} found`)
        next()
    }
    catch(err){
        console.error(err)
        return res.status('400').json({
            error: "Could not retrieve table"
        })
    }
}
const tableByPoin = async (req, res, next , poin) =>{
  try{
    console.info(`find table by poin: ${poin}`)

    let table = await Table.findOne({tablePoin : poin})

    if(!table){
        console.error(`table: ${poin} not found`)
        return res.status('400').json({
          error: "table not found"
        })    
    }
    req.table = table
    console.info(`tablePoin: ${poin} found`)
    next()
}
catch(err){
    console.error(err)
    return res.status('400').json({
        error: "Could not retrieve table"
    })
}
}


const read = (req, res) => {
    console.info(`Read tablePoin: ${req.table.id}`)
    return res.json(req.table)
}

const list = async (req, res) => {
    try {
      const current = parseInt(req.query.page)-1
      if(isNaN(current)) current=0
      const pagesize = parseInt(req.query.pagesize)
      if(isNaN(pagesize)) pagesize=0
      console.info('get list table')
      let tables = await Table.find().select('tablePoin status')

      const total = tables.length
      console.info(`total: ${total}`)

      if(current*pagesize < tables.length){
        tables=tables.slice(current*pagesize, Math.min((current+1)*pagesize,tables.length))
      }
      else{
        tables=[]
      }
  
      console.info('get list table finished')
    
      res.json({
          page : (current+1) ,
          pagesize : pagesize,
          total: total,
          tables : tables
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
      console.info(`update table: ${req.table.id}`)
      const tablePoinExists = await Table.findOne({tablePoin : req.table.tablePoin})
      if(tablePoinExists._id !== req.table.id){
        console.error("tablePoin already exists")
        return res.status(400).json({error : "tablePoin already exists"})
      }

      let table = req.table
      table = extend(table, req.body)
      table.updated = Date.now()
      await table.save()
      console.info(`update table: ${req.table.id} finished`)
      res.json(table)
    } catch (err) {
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}

const remove = async (req, res) => {
    try {
      console.info(`delete table:  ${req.table.id}`)
      let table = req.table
      let deletedTable = await table.remove()
      console.info(`delete table: ${req.table.id} finished`)
      res.json(deletedTable)
    } catch (err) {
      console.error(err)
      return res.status(400).json(
        {error : "bad request"}
      )
    }
}
const tableStatus = async (req,res) =>{
  try{
    console.info(`update table status: ${req.table.id}`)
    let table = req.table 
    table.status = req.body.tableStatus

    await table.save()
    console.info(`update table status: ${req.table.id} finished`)
    res.json(table)
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
    tableById,
    tableByPoin,
    read,
    list,
    remove,
    update,
    tableStatus
}

