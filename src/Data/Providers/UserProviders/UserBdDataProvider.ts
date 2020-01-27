import { IDataProvider } from "../../IDataProvider";
import { User, InvalidUser } from "../../../Models/Users/User";
import UserValues from "../../../Models/Users/UserValues";
import mySql from 'mysql';
import { Singleton } from "../../../Development/Singletons";

export default class UserBdDataProvider implements IDataProvider<User, UserValues> {
    async create(item: User): Promise<User> {
        const itemValues = item.getValues();
        const query = `INSERT INTO users (first_name, phone_number, user_role, bonuses)
        VALUES ("${itemValues.firstName}", "${itemValues.phoneNumber}", ${itemValues.userRole}, ${itemValues.bonuses});`;
        try {
            await this.makeQueryAsync(query);
        } catch(err) {
            Singleton.getLogger().error(`Cannot create user! \n ${err.toString()}`);
            return new InvalidUser();
        }
        return item.clone();
    }    
    
    read(...keys: any): Promise<User> {
        const userValues = keys as UserValues;
        throw new Error("Method not implemented.");
    }

    update(values: UserValues, ...keys: any): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(...keys: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    makeQueryAsync(query: string) {
        const connection = mySql.createConnection({
            host     : 'localhost',
            user     : 'root',
            password : '1488',
            database : 'bc_bonuses'
          });
        connection.connect();
        return new Promise((resolve, reject) => {
            connection.query(query, (err, results, fields) => {
                if(err) {
                    reject(err);
                } else {
                    Singleton.getLogger().info(`Results from query! \n ${JSON.stringify(results)}`);
                    connection.end();
                    resolve(results);
                }        
            });
        })
    }

}