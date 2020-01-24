import {EventTypes} from "../../Data/Events/EventType";
import {ParamsDictionary} from "express-serve-static-core";
import * as Express from 'express';
import { EventNames } from '../../Data/Events/EventName';
import {IRouterHandler, IEventListenerDelegate } from "../RouterInterfaces";
import { IDataProvider } from "../../Data/IDataProvider";
import { IDataProviderCreator } from "../../Data/IDataProviderCreator";
import UserValues from "../../Models/Users/UserValues";

export default class ShopRouterHandler implements IRouterHandler {
 
    private _dataProvider: IDataProvider<String, UserValues>;
    constructor(dataProviderFactory: IDataProviderCreator<String, UserValues>) {
        this._dataProvider = dataProviderFactory.create();
    }

    onPost(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }    
    onPut(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    onDelete(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    onGet(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    onList(req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addEventListener(evType: EventTypes, evName: EventNames, callBack: IEventListenerDelegate): void {
        throw new Error("Method not implemented.");
    }
    getEventByType(evType: EventTypes): import("events").EventEmitter | undefined {
        throw new Error("Method not implemented.");
    }
} 