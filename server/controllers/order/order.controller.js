import Order from "../../models/order.model";
import Product from "../../models/product.model";
import Member from "../../models/member.model";
const create = async (req, res) => {
  const order = new Order();
  try {
    order.table = req.body.table;
    order.user = req.auth._id;
    await order.save();
    console.info("product is saved");
    order.user = undefined;
    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "bad request" });
  }
};

const orderByID = async (req, res, next, id) => {
  try {
    console.log(`find order: ${id}`);

    let order = await Order.findById(id);
    if (!order) {
      console.error(`Order: ${id} not found`);
      return res.status("400").json({
        error: "Order not found",
      });
    }
    req.order = order;
    console.info(`order: ${id} found`);
    next();
  } catch (err) {
    console.error(err);
    return res.status("400").json({
      error: "Could not retrieve product",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    let order = req.order;
    let product = await Product.findById(req.body.productId);
    var index = order.orderItem.findIndex(
      (e) => e.ProductID === req.body.productId
    );
    if (index != -1) {
      order.orderItem[index].quantity =
        parseInt(order.orderItem[index].quantity) + parseInt(req.body.quantity);
      if (order.orderItem[index].quantity < 0) {
        order.orderItem.splice(index, 1);
      }
    } else if (parseInt(req.body.quantity) > 0) {
      order.orderItem.push({
        ProductID: product._id,
        name: product.name,
        price: product.price,
        quantity: parseInt(req.body.quantity),
      });
    }
    order.updated = Date.now();
    await order.save();
    order.user = undefined;
    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status("400").json({
      error: "Could not retrieve product",
    });
  }
};

const addDiscount = async (req, res) => {};

const read = async (req, res) => {
  return res.json(req.order);
};

// add orderID vào table
const checkOut = async (req, res) => {
  try {
    let order = req.order;
    let memberId = req.body.memberId;
    let member = await Member.findById(memberId);
    if (member) {
      member.point += 1;
      await member.save();
    }
    order.payment.paymentMethod = req.body.paymentMethod;

    order.payment.status = true;
    order.updated = Date.now();
    await order.save();
    
    order.user = undefined;
    return res.json(order);
  } catch (err) {
    console.error(err);
    return res.status("400").json({
      error: "Could not retrieve product",
    });
  }
};

const cancel = async (req, res) => {
  try {
    let order = req.order;
    order.status = false;
    order.updated = Date.now();
    await order.save();
    return res.json({
      "message ": "Order has been cancelled",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "bad request" });
  }
};

const list = async (req, res) => {
  try {
    var current = parseInt(req.query.page) - 1;
    if (isNaN(current)) current = 0;
    var pagesize = parseInt(req.query.pagesize);
    if (isNaN(pagesize)) pagesize = 10;

    const status = req.query.status;
    const paymentStatus = req.query.paymentStatus;
    const paymentMethod = req.query.paymentMethod;
    const topTotal = req.query.topTotal;
    const botTotal = req.query.botTotal;
    const table = req.query.table;

    console.info("get list order");
    let orders = await Order.find().select();
    orders = orders.filter(
      (order) =>
        (status === undefined || order.status === (status === "true")) &&
        (paymentStatus === undefined ||
          order.payment.status === (paymentStatus === "true")) &&
        (paymentMethod === undefined ||
          order.payment.paymentMethod === paymentMethod) &&
        (table === undefined || order.table === table) &&
        (topTotal === undefined || order.total <= parseFloat(topTotal)) &&
        (botTotal === undefined || order.total >= parseFloat(botTotal))
    );

    const total = orders.length;
    if (current * pagesize < total) {
      orders = orders.slice(
        current * pagesize,
        Math.min((current + 1) * pagesize, orders.length)
      );
    } else {
      orders = [];
    }

    console.info("get list order finished");

    res.json({
      page: current + 1,
      pagesize: pagesize,
      total: total,
      orders: orders,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: "bad request" });
  }
};

export default {
  create,
  orderByID,
  addProduct,
  checkOut,
  list,
  read,
  cancel,
};
