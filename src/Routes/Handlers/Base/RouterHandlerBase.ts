import { IRouterHandler, IEventListenerDelegate } from "../../RouterInterfaces";
import { ParamsDictionary } from "express-serve-static-core";
import { Request, Response, NextFunction } from "express";
import { EventTypes } from "../../../Data/Events/EventType";
import { EventEmitter } from "events";
import { EventNames } from "../../../Data/Events/EventName";

export default class RouterHandlerBase implements IRouterHandler {
    
    protected _eventDict: Map<EventTypes, EventEmitter>;
    constructor() {
        this._eventDict = new Map<EventTypes, EventEmitter>();
        this.initializeEventDict();
    }

    initializeEventDict() {
        this._eventDict.set(EventTypes.ON_DELETE, new EventEmitter());
        this._eventDict.set(EventTypes.ON_GET, new EventEmitter());
        this._eventDict.set(EventTypes.ON_LIST, new EventEmitter());
        this._eventDict.set(EventTypes.ON_POST, new EventEmitter());
        this._eventDict.set(EventTypes.ON_PUT, new EventEmitter());
    }

    onPost(req: Request<ParamsDictionary>, res: Response, next?: NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }    
    onPut(req: Request<ParamsDictionary>, res: Response, next?: NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    onDelete(req: Request<ParamsDictionary>, res: Response, next?: NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    onGet(req: Request<ParamsDictionary>, res: Response, next?: NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    onList(req: Request<ParamsDictionary>, res: Response, next?: NextFunction | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    addEventListener(evType: EventTypes, evName: EventNames, callBack: IEventListenerDelegate): void {
        const event = this._eventDict.get(evType);
        event?.addListener(evName.toString(), callBack);
    }
    getEventByType(evType: EventTypes): EventEmitter | undefined {
        return this._eventDict.get(evType);;
    }

}