import 'regenerator-runtime/runtime'; // for use of async / await
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

import config from 'config';
const { NODE_ENV } = process.env;
const configData = config(NODE_ENV);
const { APIPort } = configData;

import schema from 'schema';
import { connectmysql } from 'connectors/mysql';

const start = async () => {
  const mysql = await connectmysql();

  const app = express();

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    context: {mysql},
    schema,
  }));
  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  app.listen(APIPort, ()=> {
    console.log(`Running on port ${APIPort}.`);
  });

};

start();
