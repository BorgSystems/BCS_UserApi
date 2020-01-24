import { IRouter } from "../RouterInterfaces";
import * as Express from "express";
import { ResponseItem, StatusType, FailedReason } from "../ResponseData/ResponseData";
import jwt from 'jsonwebtoken';
import config from '../../Config/Config';
export default class AuthorizationRouter implements IRouter {
    private _router: Express.Router;
    constructor() {
        this._router = Express.Router();
        this._router.post('/login', async (req, res) => {
            const responseItem = new ResponseItem();
            const login = req.body?.login;
            const password = req.body?.password;

            if(login && password) {
                const isCorrectLogin = login === 'intfloatbool@gmail.com';
                const isCorrectPassword = password === '12345';
                if(isCorrectLogin && isCorrectPassword) {
                    const token = jwt.sign({login: login}, config.JWT_SECRET, {
                        expiresIn: "150000" //150 sec
                    });
                    responseItem.Status = StatusType.SUCCESS;
                    responseItem.Data = {
                        token: token
                    }
                    return res.json(responseItem);
                } else {
                    responseItem.Status = StatusType.FAILED;
                    responseItem.Data = new FailedReason(`Login or Password is incorrect!`);
                    return res.json(responseItem);
                }
            }

            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(`Cannot login with values: \n login:${req.body?.login} \n password:${req.body?.password}`);
            return res.json(responseItem);
        });
    }
    getRouter(): Express.Router {
        return this._router;
    }

}