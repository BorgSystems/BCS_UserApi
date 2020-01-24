import { IDataProvider } from "../../IDataProvider";
import Product from "../../../Models/Shop/Product";
import ProductValues from "../../../Models/Shop/ProductValues";

export default class ProductProviderBD implements IDataProvider<Product, ProductValues> {
    create(item: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }    
    update(values: ProductValues, ...keys: any): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    read(...keys: any): Promise<Product> | Promise<null> {
        throw new Error("Method not implemented.");
    }
    delete(...keys: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

}