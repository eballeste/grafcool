const links = [
  {
    id: 0,
    url: 'http://graphql.org/',
    description: 'i want to believe'
  },
  {
    id: 1,
    url: 'http://dev.apollodata.com',
    description: 'let me see into that future'
  }
];

export default { 
  Query: {
    allLinks: () => links,
  },
  Mutation: {
    createLink: (_, data) => {
      const newLink = Object.assign({id: links.length}, data);
      links.push(newLink);
      return newLink;
    }
  }
};
