import ValuesBase from "../ValuesBase";
import IClonable from "../Interfaces/IClonable";
import { UserRoles } from "./UserExportData";

/**
 * Fields of userValues should be same as in the database!
 */
export default class UserValues extends ValuesBase implements IClonable<UserValues> {
    //Fields names like in dataBase!
    first_name?: String;
    phone_number?: String;
    user_role?: UserRoles;
    bonuses?: Number;
    reset() {
        this.first_name = undefined;
        this.phone_number = undefined;
        this.user_role = undefined;
        this.bonuses = undefined;
    }
    clone(oldValues?: UserValues): UserValues  {
        if(oldValues) 
            this.saveOldValues(oldValues);

        const copy = new UserValues();
        copy.id = this.id;
        copy.first_name = this.first_name;
        copy.phone_number = this.phone_number;
        copy.user_role = this.user_role;
        copy.bonuses = this.bonuses;
        return copy;
    }
}