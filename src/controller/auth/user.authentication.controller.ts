import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../appDataSource";
import { User } from "../../entity/auth/user.entity";
import bcryptjs from 'bcryptjs';
import { sign, verify } from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

export const Login = async (req: Request, res: Response) => {
    const user = await userRepository.findOneBy({user_name: req.body.user_name});

    if (!user || !await bcryptjs.compare(req.body.password, user.password)) {
        return res.status(400).json({
            message: 'Invalid credentials!'
        })
    }

    const payload = {
        id: user.id,
        name: user.first_name + " " + user.last_name,
        email: user.email,
        user_name: user.user_name
    }

    const token = sign(payload, 'secret');

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    })

    res.json({
        message: 'success'
    })
}

export const AuthenticatedUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const jwt = req.cookies['jwt'];
        const payload: any = verify(jwt, 'secret');

        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            })
        }

        const { password, ...user} = await userRepository.findOneBy({id: payload.id});
        res.send(user);
    } catch (error) {
        next(error)
    }
}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.json({
        message: 'success'
    })
}