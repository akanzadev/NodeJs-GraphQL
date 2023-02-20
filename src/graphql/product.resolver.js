const getProduct = async (parent, args, context, info) => {
  const { id } = args;
  // const { db } = context;
  // const product = await db.Product.findByPk(id);
  // return product;
  return {
    id: id,
    name: 'Product 1',
    price: 1.1,
    description: 'Product 1 description',
    image: 'https://picsum.photos/200/300',
    createdAt: new Date().toISOString(),
  };
};

const getProducts = async (parent, args, context, info) => {
  const { db } = context;
  const products = await db.Product.findAll();
  return products;
};

const addProduct = async (parent, args, context, info) => {
  const { db } = context;
  const { name, price, description, image } = args;
  const product = await db.Product.create({
    name,
    price,
    description,
    image,
  });
  return product;
};

module.exports = {
  getProduct,
  getProducts,
  addProduct,
};
