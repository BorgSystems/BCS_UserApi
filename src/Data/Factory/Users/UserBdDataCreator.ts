import { IDataProviderCreator } from "../../IDataProviderCreator";
import { User } from "../../../Models/Users/User";
import UserValues from "../../../Models/Users/UserValues";
import { IDataProvider } from "../../IDataProvider";
import UserSqlBdDataProvider from "../../Providers/UserProviders/UserSqlBdDataProvider";

export default class UserBdDataCreator implements IDataProviderCreator<User, UserValues> {
    create(): IDataProvider<User, UserValues> {
        return new UserSqlBdDataProvider();
    }
}