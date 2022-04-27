/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { logOut, signIn, signUp } from '../controllers/authControllers.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const authRouters = Router();

authRouters.post('/login', validateSchemaMiddleware, signIn);
authRouters.post('/register', validateSchemaMiddleware, signUp);
authRouters.delete('/logout', validateTokenMiddleware, logOut);

export default authRouters;
