const ProductsService = require('../services/product.service');
const service = new ProductsService();

const getProduct = (parent, { id }) => service.findOne(id);

const getProducts = (parent, args, context, info) => service.find({});

const addProduct = (parent, { dto }) => service.create(dto);

const updateProduct = (parent, { id, dto }) => service.update(id, dto);

const deleteProduct = async (parent, { id }) => {
  await service.delete(id);
  return id;
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};
