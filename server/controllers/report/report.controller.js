import Order from '../../models/order.model'

// Số lượng đơn hàng theo ngày / giờ
const getNumberOfOrder = async(req,res) =>{
    let start = new Date(1,1,1,0,0,0)

    let year = parseInt(req.query.year)
    let month = parseInt(req.query.month)
    let day = parseInt(req.query.day)
    let hour =parseInt(req.query.hour)
    let from, to, number

    switch (true) {
        case isNaN(year):
            return res.json({number : await Order.countDocuments()})
            break;
        case isNaN(month):
            from =  new Date(year,1,1,0,0,0).toISOString()
            to = new Date(year+1,1,1,0,0,0).toISOString()
            break;
        case isNaN(day):
            from =  new Date(year,month,1,0,0,0).toISOString()
            to = new Date(year, month+1 ,1,0,0,0).toISOString()
            break;
        case isNaN(hour):
            from =  new Date(year,month,day,0,0,0).toISOString()
            to = new Date(year, month,day+1 ,1,0,0,0).toISOString()
            break;
        default:
            from =  new Date(year,month,day,hour,0,0).toISOString()
            to = new Date(year, month,day,hour+1,0,0,0).toISOString()

    }
    number = await Order.countDocuments({
        created: {
            $gte : from ,
            $lt : to
        }
    })
    return res.json({
        from : from,
        to : to,
        number : number
    })
}

// Số tiền t heo ngày / giờ

// Số đơn bị huỷ theo ngày, giờ 

// Số lượng member

// Số lượng user

// Số lượng món theo loại

export default {
    getNumberOfOrder
}