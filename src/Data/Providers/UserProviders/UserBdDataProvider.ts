import { IDataProvider } from "../../IDataProvider";
import { User } from "../../../Models/Users/User";
import UserValues from "../../../Models/Users/UserValues";

export default class UserBdDataProvider implements IDataProvider<User, UserValues> {
    create(item: User): Promise<User> {
        throw new Error("Method not implemented.");
    }    
    update(values: UserValues, ...keys: any): Promise<User> {
        throw new Error("Method not implemented.");
    }
    read(...keys: any): Promise<User> | Promise<null> {
        throw new Error("Method not implemented.");
    }
    delete(...keys: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}