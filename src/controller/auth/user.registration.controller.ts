import { NextFunction, Request, Response } from "express"
import { RegisterValidation } from "../../validation/register.validation";
import { AppDataSource } from "../../appDataSource";
import { User } from "../../entity/auth/user.entity";
import bcryptjs from 'bcryptjs';

const userRepository = AppDataSource.getRepository(User);

export const Register = async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const { error } = RegisterValidation.validate(body);

    if (error) {
        return res.status(400).send(error.details);
    }

    if (body.password !== body.password_confirm) {
        return res.status(400).send({message: "Password do not match!"});
    }

    try{
        const user = await userRepository.save({
            first_name: body.first_name,
            last_name: body.last_name,
            user_name: body.user_name,
            email: body.email,
            password: await bcryptjs.hash(body.password, 10)
        });
        res.send(user);
    } catch (error) {
        next(error);
    }
}