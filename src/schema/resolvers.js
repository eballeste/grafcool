import { Maker, Pizza, Topping } from './mysqlConnector';

export default { 
  Query: {
    allPizzas: () => Pizza.findAll(),
    allToppings: () => Topping.findAll(),
    allMakers: () => Maker.findAll(),
  },
  Mutation: {
    createMaker: (_, {name, email, password}, context) => {
      const newMaker = {
        name,
        email,
        password,
      };
      return Maker.create(newMaker).then(maker => {
        const dbMaker = maker.get({plain: true});
        const { id, name, email, password } = dbMaker;
        return Object.assign({
          id,
          name,
          email,
          password,
        });
      });
    }
  }
};
