import Order from "../../models/order.model";

const getReportByDates = async (req, res) => {
  const dateFrom = req.query.dateFrom;
  const dateTo = req.query.dateTo;

  const dateToFormat = new Date(dateTo);
  dateToFormat.setUTCDate(dateToFormat.getUTCDate() + 1); //format to next day

  if (dateFrom && dateTo) {
    const result = await Order.find({
      //format "YYYY-MM-DD"
      created: {
        $gte: dateFrom,
        $lte: dateToFormat,
      },
    });
    if (result && result.length !== 0) {
      res.status(200).json({ result });
    } else {
      res.status(401).json({ error: "No Order found" });
    }
  } else {
    res.status(401).json({ error: "Dates not valid" });
  }
};

const getNumberOfOrder = async (req, res) => {
  let year = parseInt(req.query.year);
  let month = parseInt(req.query.month);
  let day = parseInt(req.query.day);
  let hour = parseInt(req.query.hour);
  let status = req.query.status;
  let from, to, number;
  switch (true) {
    case isNaN(year):
      if (status === undefined)
        return res.json({ number: await Order.countDocuments() });
      return res.json({
        number: await Order.countDocuments({ status: status }),
      });
      break;
    case isNaN(month):
      from = new Date(year, 1, 1, 0, 0, 0).toISOString();
      to = new Date(year + 1, 1, 1, 0, 0, 0).toISOString();
      break;
    case isNaN(day):
      from = new Date(year, month, 1, 0, 0, 0).toISOString();
      to = new Date(year, month + 1, 1, 0, 0, 0).toISOString();
      break;
    case isNaN(hour):
      from = new Date(year, month, day, 0, 0, 0).toISOString();
      to = new Date(year, month, day + 1, 1, 0, 0, 0).toISOString();
      break;
    default:
      from = new Date(year, month, day, hour, 0, 0).toISOString();
      to = new Date(year, month, day, hour + 1, 0, 0, 0).toISOString();
  }
  if (status === undefined)
    number = await Order.countDocuments({
      created: {
        $gte: from,
        $lt: to,
      },
    });
  else {
    number = await Order.countDocuments({
      created: {
        $gte: from,
        $lt: to,
      },
      status: status,
    });
  }
  return res.json({
    from: from,
    to: to,
    number: number,
  });
};

// Số tiền theo ngày / giờ

// Số lượng member

// Số lượng user

// Số lượng món theo loại

export default {
  getReportByDates,
  getNumberOfOrder,
};
