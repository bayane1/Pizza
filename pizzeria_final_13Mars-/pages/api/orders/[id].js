import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";


const handler = async (req, res) => {

  await dbConnect();

  const {
      method, 
      query: { id }, 
  } = req;


  if(method === "GET"){
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    }
    catch(err){
      res.status(500).json(err);
      }
  }
  if(method === "PUT"){
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    }
    catch(err){
      res.status(500).json(err);
    }
  }
  if(method === "DELETE"){
      try {
        const order = await Order.create(req.body);
        res.status(200).json(order);
      }
      catch(err){
        res.status(500).json(err);
      }
  }
}

export default handler;