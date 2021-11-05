import Table from '../models/table.model'
import extend from 'lodash/extend'

const create = async(req, res) =>{
    const table = new Table(req.body)
    try{

        const isNumberExists = await Table.exists({number : table.number})
        if(isNumberExists){
            console.error("number table already exists")
            return res.status(400).json({error : "number table already exists"})
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
        console.info(`tableId: ${id} found`)
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
    console.info(`Read TableId: ${req.table.id}`)
    return res.json(req.table)
}

const list = async (req, res) => {
    try {
      const current = parseInt(req.query.page)-1
      const pagesize = parseInt(req.query.pagesize)
      const status = req.query.status
      const topNo = parseInt(req.query.topNo)
      const botNo = parseInt(req.query.botNo)
      console.info('get list table')
      let tables = await Table.find().select('_id number description status')
      tables.filter(table =>(
        (status === undefined || table.status.includes(status))
        && (topNo===undefined || table.number <= topNo)
        && (botNo === undefined || table.number >= botNo)
      ))
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

export default {
    create,
    tableById,
    read,
    list,
    remove,
    update
}

