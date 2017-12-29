export default { 
  Query: {
    allPizzas: (_, __, {mysql: { Pizza }}) => Pizza.findAll(),
    allToppings: (_, __, {mysql: { Topping }}) => Topping.findAll(),
    allMakers: (_, __, {mysql: { Maker }}) => Maker.findAll(),
  },
  Mutation: {
    createMaker: (_, {name, email, password}, {mysql: { Maker }}) => {
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
    },
    signinMaker: (_, {email, password}, {mysql: { Maker }}) => {
      return Maker.findOne({email, password}).then(maker => {
        const dbMaker = maker.get({plain: true});
        const { email } = dbMaker;
        return Object.assign({
          token: email,
          maker: dbMaker,
        });
      });
    },
  }
};
