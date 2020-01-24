import IClonable from "./Interfaces/IClonable";

export default class ValuesBase{
    saveOldValues(oldValues: any) {
        if(oldValues) {
            Object.keys(oldValues).forEach(k => {
                let oldValue = Reflect.get(oldValues, k);
                if(oldValue) {
                    let newValue = Reflect.get(this, k);
                    if(!newValue) {
                        Reflect.set(this, k, oldValue);
                    }
                }
            });
        }
    }
    itemID: Number = 0;
}