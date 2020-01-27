import { IDataProvider } from "../../IDataProvider";
import {User} from '../../../Models/Users/User';
import UserValues from "../../../Models/Users/UserValues";
import UserValuesBuilder from "../../Builders/ValuesBuilder/UserValuesBuilder";

export class FakeDataProvider implements IDataProvider<User, UserValues> {
    
    private _currentUserIndex: number;
    private userData: Array<User>;
    private _valuesBuilder: UserValuesBuilder;
    constructor() {
        this._currentUserIndex = 0;
        this._valuesBuilder = new UserValuesBuilder();
        this.userData = [];
        //fill data for test
        this.create(
            new User(
                this._valuesBuilder
                    .setFirstName('Vova')
                    .setPhoneNumber('8544 333 21 31')
                    .build()
            ));
        this.create(
            new User(
                this._valuesBuilder
                    .setFirstName('B0riz')
                    .setPhoneNumber('8577 555 21 98')
                    .build()
            ));
        this.create(
            new User(
                this._valuesBuilder
                    .setFirstName('Michael')
                    .setPhoneNumber('8544 123 55 21')
                    .build()
            ));
    }

    create(user: User): Promise<User> {
        return new Promise((resolve,reject) => {
            try {
                this.userData.push(user);
                user.getValues().id = this._currentUserIndex;
                this._currentUserIndex++;
                resolve(user.clone());
            } catch(err) {
                reject(err);
            }
        });
    }
    update(newUserValues: UserValues, ...keys: any): Promise<User> {
        const userId = keys[0];
        return new Promise((resolve, reject) => {
            try {
                const target = this.userData.find(u => u.getValues().id === userId);
                if(target) {
                    const oldValues = target.getValues();
                    const targetId = oldValues.id;
                    newUserValues.id = targetId;
                    target.setValues(newUserValues.clone(oldValues));
                    resolve(target.clone());
                } else {
                    resolve(undefined);
                }
            } catch(err) {
                reject(err);
            }
        });
    }
    list(): Promise<Array<User>> {
        return new Promise(resolve => resolve(this.userData));
    }    
    read(userId: Number): Promise<User> {
        return new Promise<User>((resolve,reject) => {
            try {
                const target = this.userData.find(u => u.getValues().id === userId);
                if(target) {
                    resolve(target.clone());
                } else {
                    resolve(undefined);
                }
            } catch(err) {
                reject(err);
            }
        });
    }

    delete(id: Number): Promise<boolean> {
        return new Promise<boolean>((resolve,reject) => {
            try {
                const target = this.userData.find(u => u.getValues().id === id);
                if(target) {
                    const index = this.userData.indexOf(target);
                    let isDeleted = false;
                    if(index >= 0) {
                        this.userData.splice(index, 1);
                        isDeleted = true;
                    }
                    resolve(isDeleted);
                } else {
                    resolve(false);
                }
            } catch(err) {
                reject(err);
            }
        });
    }

}