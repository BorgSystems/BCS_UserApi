import {EventTypes} from "../../Data/Events/EventType";
import {ParamsDictionary} from "express-serve-static-core";
import * as Express from 'express';
import { ResponseItem, StatusType, FailedReason } from '../ResponseData/ResponseData';
import { User } from '../../Models/Users/User';
import UserValuesBuilder from '../../Data/Builders/ValuesBuilder/UserValuesBuilder';
import { EventNames } from '../../Data/Events/EventName';
import ApiContainer from '../../Data/ApiContainer';
import RouterHandlerBase from './Base/RouterHandlerBase';
import ISafeRouterHandler from "./Base/ISafeRouterHandler";
import { ISafePredictableDelegate } from "../RouterInterfaces";
import { IDataProvider } from "../../Data/IDataProvider";
import UserValues from "../../Models/Users/UserValues";
import { IDataProviderCreator } from "../../Data/IDataProviderCreator";


export default class UserRouterHandler extends RouterHandlerBase implements ISafeRouterHandler {

    private _dataProvider: IDataProvider<User, UserValues>;
    constructor(dataProviderCreator: IDataProviderCreator<User, UserValues>) {
        super();
        this._dataProvider = dataProviderCreator.create();
    }

    isSafe(apiContainer: ApiContainer,predictableFunc: ISafePredictableDelegate): Promise<boolean> {
        return predictableFunc(apiContainer);
    }
    onPost = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        
        const apiContainer = new ApiContainer(req, res);
        this.getEventByType(EventTypes.ON_POST)?.emit(EventNames.OnConnectionStart, apiContainer);
        const body = req.body;
        const responseItem = new ResponseItem();
        try {
            //checking role of user isnt admin - throws error
            await this.isSafe(apiContainer, async () => {
                const isCorrect = apiContainer.RequsetObj?.body?.role === 'ADMIN';
                if(!isCorrect) {
                    throw new Error("Permission denied!");
                }
                return Promise.resolve(isCorrect);
            });

            if(!body) {
                throw new Error("No body of request.");
            }
            const firstName = body.firstName;
            const phoneNumber = body.phoneNumber;
            const user = await this._dataProvider.create(new User(
                new UserValuesBuilder()
                .setFirstName(firstName)
                .setPhoneNumber(phoneNumber)
                .build()
            ));

            if(user) {
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = user;
            } 

        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString());
        }
        this.getEventByType(EventTypes.ON_POST)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }    
    onPut = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        this.getEventByType(EventTypes.ON_PUT)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        const responseItem = new ResponseItem();
        const body = req.body;
        try {
            if(!body) {
                throw new Error("No body of request.");
            }
            const firstName = body.firstName;
            const phoneNumber = body.phoneNumber;

            const userId = req.params.id;
            const user = await this._dataProvider.update( 
                new UserValuesBuilder()
                    .setFirstName(firstName)
                    .setPhoneNumber(phoneNumber)
                    .build(),
                    
                    Number(userId)
                );
            if(user) {
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = user;
            } else {
                responseItem.Status = StatusType.FAILED;
                responseItem.Data = new FailedReason(`Cannot find item with id${userId}!`);
            }
        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString());
        }
        this.getEventByType(EventTypes.ON_PUT)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }
    onDelete = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        const responseItem = new ResponseItem();
        this.getEventByType(EventTypes.ON_DELETE)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        try {
            const userId = req.params.id;
            const isUserDeleted = await this._dataProvider.delete(Number(userId));
            if(isUserDeleted) {
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = {deleted: true};
            } else {
                responseItem.Status = StatusType.FAILED;
                responseItem.Data = new FailedReason(`Cannot find item with id${userId}!`);
            }
        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString());
        }
        this.getEventByType(EventTypes.ON_DELETE)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }
    onGet = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        const responseItem = new ResponseItem();
        this.getEventByType(EventTypes.ON_GET)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        try {
            const userId = req.params.id;
            const user = await this._dataProvider.read(Number(userId));
            if(user) {
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = user;
            } else {
                responseItem.Status = StatusType.FAILED;
                responseItem.Data = new FailedReason(`Cannot find item with id${userId}!`);
            }
        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString());
        }
        this.getEventByType(EventTypes.ON_GET)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }
    onList = async (req: Express.Request<ParamsDictionary>, res: Express.Response, next?: Express.NextFunction | undefined): Promise<void> => {
        const responseItem = new ResponseItem();
        this.getEventByType(EventTypes.ON_LIST)?.emit(EventNames.OnConnectionStart, new ApiContainer(req, res));
        try {
            if(this._dataProvider) {
                const users = await this._dataProvider.list();    
                responseItem.Status = StatusType.SUCCESS;
                responseItem.Data = users;         
            } else {
                responseItem.Status = StatusType.FAILED;
                responseItem.Data = new FailedReason(`DataProvier is null!`); 
            }
        } catch(err) {
            responseItem.Status = StatusType.FAILED;
            responseItem.Data = new FailedReason(err.toString()); 
        }
        this.getEventByType(EventTypes.ON_LIST)?.emit(EventNames.OnConnectionFinish, new ApiContainer(req, res, responseItem));
        res.json(responseItem);
    }
}