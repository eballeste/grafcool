import 'regenerator-runtime/runtime'; // for use of async / await
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import config from 'config';
const { NODE_ENV } = process.env;
const configData = config(NODE_ENV);
const { APIPort } = configData;

import schema from 'schema';

const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(APIPort, ()=> {
  console.log(`Running on port ${APIPort}.`);
});