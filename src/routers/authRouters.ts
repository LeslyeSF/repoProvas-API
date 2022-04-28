/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { logOut, signIn, signUp } from '../controllers/authControllers.js';
import validateUserSchemaMiddleware from '../middlewares/validateUserSchemaMiddleware.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const authRouters = Router();

authRouters.post('/login', validateUserSchemaMiddleware, signIn);
authRouters.post('/register', validateUserSchemaMiddleware, signUp);
authRouters.delete('/logout', validateTokenMiddleware, logOut);

export default authRouters;
