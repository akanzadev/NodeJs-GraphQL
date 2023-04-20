const bycrypt = require('bcrypt');

const sequelize = require('../../src/db/sequelize');
const { models } = sequelize;

const upSeed = async () => {
  try {
    await sequelize.sync({ force: true }); // force: true will drop the table if it already exists
    const password = 'admin123';
    const hash = await bycrypt.hash(password, 10);
    await models.User.create({
      email: 'admin@gmail.com',
      password: hash,
      role: 'admin',
    });
    await models.Category.bulkCreate([
      {
        name: 'Category 1',
        image: 'https://picsum.photos/200/300',
      },
      {
        name: 'Category 2',
        image: 'https://picsum.photos/200/300',
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};

const downSeed = async () => {
  await sequelize.drop();
};

module.exports = { upSeed, downSeed };
