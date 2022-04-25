/* eslint-disable import/no-unresolved */
import express, { json } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routers from './routers/index.js';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware.js';

const server = express();

server.use(cors());
server.use(json());
server.use(routers);
server.use(errorHandlingMiddleware);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
