import { Cart } from '../models/allModels';

const deleteItemfromCart = async (req, res) => {
  try {
    const cartItem = await Cart.destroy({ where: { customerId: req.query.custId } });
    if (cartItem) {
      return res.status(200).send('Cart Cleared Successfully');
    }
    return res.status(500).send('Internal Server Error');
  } catch (error) {
    console.log(error);
  }
};
export default deleteItemfromCart;
