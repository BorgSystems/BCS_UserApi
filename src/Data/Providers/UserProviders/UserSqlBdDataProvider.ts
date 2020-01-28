import { IDataProvider } from "../../IDataProvider";
import { User, InvalidUser } from "../../../Models/Users/User";
import UserValues from "../../../Models/Users/UserValues";
import mySql from 'mysql';
import { Singleton } from "../../../Development/Singletons";

const usersTableName = 'users';

export default class UserSqlBdDataProvider implements IDataProvider<User, UserValues> {
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
    /**
     * 
     * @param keys first param shuld be a string from SqlQueryConditionBuilder! 
     */
    async read(...keys: any): Promise<Array<User>> {
        const conditionQuery = keys[0] as string;
        const query = `SELECT * FROM ${usersTableName} WHERE ${conditionQuery}`;   
        const results = await this.makeQueryAsync(query) as Array<any>;
        const findedUserValues = results as Array<UserValues>;
        const users = new Array<User>();
        findedUserValues.forEach(v => users.push(new User(v)));
        return users;
    }

    /**
     * 
     * @param keys first param shuld be a string from SqlQueryConditionBuilder! 
     */
    async update(values: UserValues, ...keys: any): Promise<boolean> {
        const conditionQuery = keys[0] as string;
        let setOfChanges = '';
        values.getDefinedKeys().map((k, index, arr) => {
            const nextSymbol = arr[index + 1] ? ', ' : '';
            setOfChanges += `${k}="${Reflect.get(values, k)}"${nextSymbol}`
        });
        const query = `UPDATE ${usersTableName} SET ${setOfChanges} WHERE ${conditionQuery}`;   
        const results = await this.makeQueryAsync(query) as object;
        const affectedRows = Reflect.get(results, 'affectedRows');
        const isAffected = affectedRows > 0;
        return isAffected;
    }

    /**
     * 
     * @param keys first param shuld be a string from SqlQueryConditionBuilder! 
     */
    async delete(...keys: any): Promise<boolean> {
        const conditionQuery = keys[0] as string;
        const query = `DELETE FROM ${usersTableName} WHERE ${conditionQuery}`;
        const results = await this.makeQueryAsync(query) as object;
        const affectedRows = Reflect.get(results, 'affectedRows');
        const isAffected = affectedRows > 0;
        return isAffected;

    }
    async list(): Promise<Array<User>> {
        const query = `SELECT * FROM ${usersTableName}`;   
        const results = await this.makeQueryAsync(query) as Array<any>;
        const findedUserValues = results as Array<UserValues>;
        const users = new Array<User>();
        findedUserValues.forEach(v => users.push(new User(v)));
        return users;
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
                    //Singleton.getLogger().info(`Fields from query! \n ${JSON.stringify(fields)}`);
                    connection.end();
                    resolve(results);
                }        
            });
        })
    }

}