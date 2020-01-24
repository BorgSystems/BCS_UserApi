import { IDataProviderCreator } from "../../IDataProviderCreator";
import {IDataProvider} from "../../IDataProvider";
import { FakeDataProvider } from "../../Providers/UserProviders/FakeDataProvider";
import { User } from "../../../Models/Users/User";
import UserValues from "../../../Models/Users/UserValues";

export class FakeUserDataCreator implements IDataProviderCreator<User, UserValues> {
    create(): IDataProvider<User, UserValues> {
        return new FakeDataProvider();
    }
}