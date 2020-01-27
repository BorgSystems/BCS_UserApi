import ValuesBase from "../ValuesBase";
import IClonable from "../Interfaces/IClonable";

/**
 * Fields of userValues should be same as in the database!
 */
export default class UserValues extends ValuesBase implements IClonable<UserValues> {
    //Fields names like in dataBase!
    first_name?: String;
    phone_number?: String;
    user_role?: Number;
    bonuses?: Number;

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