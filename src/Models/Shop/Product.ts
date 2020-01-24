import ProductValues from "./ProductValues";
import IClonable from "../Interfaces/IClonable";
import { User } from "../Users/User";

export default class Product implements IClonable<User>{  
    private _productValues: ProductValues;
    constructor(productValues: ProductValues) {
        this._productValues = productValues;
    }

    setValues(productValues: ProductValues) {
        this._productValues = productValues;
    }

    getValues = () => this._productValues; 

    clone(): User {
        return new User(this._productValues.clone());
    }
}