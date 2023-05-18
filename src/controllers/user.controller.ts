import { NextFunction, Request, Response } from 'express';
import {
    findUserRoleExclude,
    deleteUserById,
    restoreUserById,
    updateUserById,
    findUserById, createUser
} from '../services/user.service';
import { CreateUserInput } from '../schemas/user.schema';
import AppError from '../utils/appError';
import { validate } from 'uuid';

export const getMeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;

        res.status(200).status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const createUserHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, password, email } = req.body;

        const user = await createUser({
            name,
            email: email.toLowerCase(),
            password,
        });

        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'User with that email already exist',
            });
        }
        next(err);
    }
};


export const updateUser = async (
    req: Request<{}, {}, CreateUserInput, {}>,
    res: Response,
    next: NextFunction
) => {
    try {
        const currentUser = res.locals.user;

        const { name, password, email } = req.body;

        const user = await updateUserById({
            id: currentUser.id,
            name,
            email: email.toLowerCase(),
            password,
        });

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        if (err.code === '23505') {
            return res.status(409).json({
                status: 'fail',
                message: 'User with that email already exist',
            });
        }
        next(err);
    }
};