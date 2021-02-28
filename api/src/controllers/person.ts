/* eslint-disable no-useless-catch */
import { NextFunction, Request, Response } from 'express';
import PersonResolver, { IPersonResolver } from '../resolvers/person';
const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resolver: IPersonResolver = new PersonResolver();
        const data = await resolver.getAll();
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id = undefined } = req.params;
        if (!id) throw new Error('invalid id');

        const resolver: IPersonResolver = new PersonResolver();
        const data = await resolver.getById(id);
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};
const getAllNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resolver: IPersonResolver = new PersonResolver();
        const data = await resolver.getAllNames();
        return res.status(200).json(data);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};

export default {
    getAll,
    getById,
    getAllNames
};
