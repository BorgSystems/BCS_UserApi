import { IDataProvider } from "../../IDataProvider";
import { User, InvalidUser } from "../../../Models/Users/User";
import UserValues from "../../../Models/Users/UserValues";
import mySql from 'mysql';
import { Singleton } from "../../../Development/Singletons";

const usersTableName = 'users';

export default class UserBdDataProvider implements IDataProvider<User, UserValues> {
    async create(item: User): Promise<User> {
        const itemValues = item.getValues();
        const query = `INSERT INTO ${usersTableName} (first_name, phone_number, user_role, bonuses)
        VALUES ("${itemValues.first_name}", "${itemValues.phone_number}", ${itemValues.user_role}, ${itemValues.bonuses});`;
        try {
            await this.makeQueryAsync(query);
        } catch(err) {
            Singleton.getLogger().error(`Cannot create user! \n ${err.toString()}`);
            return new InvalidUser();
        }
        return item.clone();
    }    
    
    async read(...keys: any): Promise<User> {
        const userValues = keys[0] as UserValues;
        const definedKeys = userValues.getDefinedKeys();

        let names = '';
        definedKeys.forEach(v => names += `${v}`);

        let searchValues = '';
        definedKeys.map((k, i, arr) => {
            console.log(`Map for ${k} and ${i} !`);
            let and = arr[i + 1] ? 'and ' : '';
            searchValues += `${k}="${Reflect.get(userValues,k)}" ${and}`;
        });

        const query = `SELECT * FROM ${usersTableName} WHERE ${searchValues}`;   
        const results = await this.makeQueryAsync(query);
        return new InvalidUser(); //test
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
        console.log(`TRY EXECUTE QUERY: \n ${query}`);
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