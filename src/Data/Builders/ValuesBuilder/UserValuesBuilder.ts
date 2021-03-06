import IBuilder from "../IBuilder";
import UserValues from "../../../Models/Users/UserValues";
import { UserRoles } from "../../../Models/Users/UserExportData";

export default class UserValuesBuilder implements IBuilder<UserValues> {
    private _userValues: UserValues;
    constructor() {
        this._userValues = new UserValues();
    }
    setId(id: Number): UserValuesBuilder {
        this._userValues.id = id;
        return this;
    }
    setFirstName(firstName: String): UserValuesBuilder {
        if(firstName)
            this._userValues.first_name = firstName;
        return this;
    }
    setPhoneNumber(phoneNumber: string): UserValuesBuilder {
        if(phoneNumber)
            this._userValues.phone_number = phoneNumber;
        return this;
    }
    setRole(userRole?: UserRoles): UserValuesBuilder {
        this._userValues.user_role = userRole;
        return this;
    }
    setBonuses(bonuses?: number): UserValuesBuilder {
        if(bonuses)
            this._userValues.bonuses = bonuses;
        return this;
    }
    build(): UserValues {
        const copy = this._userValues.clone();
        this._userValues.reset();
        return copy;
    }
    
}