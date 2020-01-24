import { IDataProviderCreator } from "../../IDataProviderCreator";
import { User } from "../../../Models/Users/User";
import UserValues from "../../../Models/Users/UserValues";
import { IDataProvider } from "../../IDataProvider";
import UserBdDataProvider from "../../Providers/UserProviders/UserBdDataProvider";

export default class UserBdDataCreator implements IDataProviderCreator<User, UserValues> {
    create(): IDataProvider<User, UserValues> {
        return new UserBdDataProvider();
    }
}