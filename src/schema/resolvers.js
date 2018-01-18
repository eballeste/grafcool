export default { 
  Query: {
    allPizzas: (_, __, {mysql: { Pizza }}) => Pizza.findAll(),
    allToppings: (_, __, {mysql: { Topping }}) => Topping.findAll(),
    allMakers: (_, __, {mysql: { Maker }}) => Maker.findAll(),
  },
  Mutation: {
    createMaker: async (_, {name, email, password}, {mysql: { Maker }}) => {
      const newMaker = {
        name,
        email,
        password,
      };
      const response = await Maker.create(newMaker);
      const maker = response.get({plain: true});
      const { id } = maker;

      return Object.assign({id}, newMaker);
    },
    signinMaker: async (_, {email, password}, {mysql: { Maker }}) => {
      const response = await Maker.findOne({ where:  {email, password} });
      const maker = response.get({plain: true});
      
      return Object.assign({
        token: email,
        maker,
      });
    },
  }
};
