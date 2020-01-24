import UserValues from "./UserValues";
import IClonable from "../Interfaces/IClonable";

export class User implements IClonable<User> {
    private _userValues: UserValues;
    constructor(userValues: UserValues) {
        this._userValues = userValues;
    }

    getValues(): UserValues {
        return this._userValues;
    }

    setValues(userValues: UserValues): void {
        this._userValues = userValues;
    }

    clone(): User {
        return new User(this._userValues.clone());
    }
}