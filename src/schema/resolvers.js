import { Maker, Pizza, Topping } from './mysqlConnector';

export default { 
  Query: {
    allPizzas: () => Pizza.findAll(),
    allToppings: () => Topping.findAll(),
    allMakers: () => Maker.findAll(),
  },
  Mutation: {
    createLink: (_, data) => {
      const newLink = Object.assign({id: links.length}, data);
      links.push(newLink);
      return newLink;
    }
  }
};
