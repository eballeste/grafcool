const links = [
  {
    id: 1,
    url: 'http://graphql.org/',
    description: 'i want to believe'
  },
  {
    id: 2,
    url: 'http://dev.apollodata.com',
    description: 'let me see into that future'
  }
];

export default { 
  Query: {
    allLinks: () => links,
  },
};
