import jwt from 'jsonwebtoken';
import { userModel } from '../models';

const authorization = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization)
            return res.status(403).send('Access denied. No token provided');

        const authToken =
            authorization && authorization.startsWith('Bearer ')
                ? authorization.slice(7, authorization.length)
                : null;

        const mySecretKey = process.env.SECRETKEY || 'mysecretkey';
        const verifyToken = jwt.verify(authToken, mySecretKey);
        if (!verifyToken) throw new Error('Wrong Token');
        const email = verifyToken.email;
        const user = await userModel.findOne({ email });
        if (!user) throw new Error('No User Found With That Token');
        user && Object.assign(verifyToken, { _id: user._id });
        req.currentUser = verifyToken;
        next();
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message,
        });
    }
};

export default authorization;
