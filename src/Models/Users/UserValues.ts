import ValuesBase from "../ValuesBase";
import IClonable from "../Interfaces/IClonable";

export default class UserValues extends ValuesBase implements IClonable<UserValues> {
    firstName?: String;
    phoneNumber?: String;
    userRole?: Number;
    bonuses?: Number;
    
    clone(oldValues?: UserValues): UserValues  {
        if(oldValues) 
            this.saveOldValues(oldValues);

        const copy = new UserValues();
        copy.itemID = this.itemID;
        copy.firstName = this.firstName;
        copy.phoneNumber = this.phoneNumber;
        copy.userRole = this.userRole;
        copy.bonuses = this.bonuses;
        return copy;
    }
}