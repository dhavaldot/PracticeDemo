import jwt from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import { userModel } from '../models';

const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkEmail = await userModel.findOne(
            { email },
            { _id: 0, email: 1 }
        );

        if (checkEmail && checkEmail.email) {
            throw new Error('Email already in use');
        }

        if (!checkEmail) {
            const saltRounds = 10;
            const hashPasword = hashSync(password, saltRounds);
            const addUser = new userModel({ email, password: hashPasword });

            const createUser = await addUser.save();

            createUser &&
                res.status(200).json({
                    success: true,
                    message: 'User Signup Successfully',
                });
        }
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkEmail = await userModel.findOne(
            { email },
            { _id: 0, email: 1, password: 1 }
        );

        if (!checkEmail) throw new Error('Can not find user with this email');

        if (checkEmail && checkEmail.email) {
            const checkPassword = await compareSync(
                password,
                checkEmail.password
            );

            if (!checkPassword) {
                throw new Error('Password is wrong, please check again');
            } else if (checkPassword) {
                const secretKey = process.env.SECRETKEY;
                const token = jwt.sign({ email }, secretKey);
                res.status(200).json({
                    success: true,
                    message: 'User LoggedIn Successfully',
                    token,
                });
            }
        }
    } catch (error) {
        res.status(400).send({ error: true, message: error.message });
    }
};

export default {
    signup,
    login,
};
