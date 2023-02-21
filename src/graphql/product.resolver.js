const ProductsService = require('../services/product.service');
const service = new ProductsService();

const getProduct = async (parent, { args }, context, info) => {
  const { id } = args;
  const product = await service.findOne(id);
  return product;
};

const getProducts = async (parent, args, context, info) => {
  const products = await service.find({});
  return products;
};

/* mutation createProduct{
  product: addProduct ( dto: {
    name: "test1",
    description: "test1-desc",
    price: 124,
    image: "test1-img",
    categoryId: 1
  }){
    id
    name
    description
  }
} */
const addProduct = async (parent, args, context, info) => {
  const { dto } = args;
  const newProduct = await service.create(dto);
  return newProduct;
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
};
