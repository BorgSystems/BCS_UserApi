import {Request, Response} from 'express';
import { ResponseItem } from '../Routes/ResponseData/ResponseData';
/**
 * Api container contains all req/res items from routers.
 */
export default class ApiContainer {
    public RequsetObj?: Request;
    public ResponseObj?: Response;
    public ResponseItem?: ResponseItem;
    constructor(req: Request, res: Response, responseItem?: ResponseItem) {
        this.RequsetObj = req;
        this.ResponseObj = res;
        this.ResponseItem = responseItem;
    }
}