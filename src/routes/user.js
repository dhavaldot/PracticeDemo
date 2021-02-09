import express from 'express';
import { userController } from '../controllers';
import { INTERNAL_LINKS } from '../enum';

export default express
    .Router()
    .post(INTERNAL_LINKS.USER.LOGIN, userController.login)
    .post(INTERNAL_LINKS.USER.SIGNUP, userController.signup);
