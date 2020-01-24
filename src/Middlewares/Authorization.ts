import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import config from '../Config/Config';
import { StatusType, ResponseItem, FailedReason } from '../Routes/ResponseData/ResponseData';
export default async (req: Request, res: Response, next: NextFunction) => {
    const responseItem = new ResponseItem();
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (token instanceof String && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(String(token), config.JWT_SECRET, (err, decoded) => {
        if (err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString());
            return res.json(responseItem);

        } else {
            req.body['decoded'] = decoded;
            next();
        }
        });
    } else {
        responseItem.Status = StatusType.FAILED;
        responseItem.Data = new FailedReason('Auth token is not supplied');
        return res.json(responseItem);

  }
}