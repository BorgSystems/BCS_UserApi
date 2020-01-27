import ValuesBase from "../Models/ValuesBase";

/**
 * IDataProvider<T, V> where T - is type of provided data, V - is type of data values
 */
export interface IDataProvider<T, V extends ValuesBase> {
    create(item: T): Promise<T>;
    update(values: V, ...keys: any): Promise<T>; 
    read(...keys: any): Promise<T>;
    delete(...keys: any): Promise<boolean>;
    list(): Promise<Array<T>>;
}