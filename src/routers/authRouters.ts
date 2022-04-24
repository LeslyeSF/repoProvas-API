/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { logOut, signIn, signUp } from '../controllers/authControllers.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const authRouters = Router();

authRouters.post('/login', signIn);
authRouters.post('/register', signUp);
authRouters.delete('/logout', validateTokenMiddleware, logOut);

export default authRouters;
