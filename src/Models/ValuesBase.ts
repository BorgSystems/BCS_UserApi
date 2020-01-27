import IClonable from "./Interfaces/IClonable";
import e = require("express");

export default class ValuesBase {
    id?: Number;
    getDefinedKeys(): Array<string> {
        const arr = new Array<string>();
        for(let key of Object.keys(this)) {
            const definedValue = Reflect.get(this, key); 
            console.log(`Find a key ${key}, defined value: ${definedValue}`);
            if(definedValue >= 0) {
                arr.push(key);
                continue;
            }
            if(definedValue) {      
                arr.push(key);
            }               
        }
        return arr;
    }

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
}