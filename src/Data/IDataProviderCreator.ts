import { IDataProvider } from "./IDataProvider";
import ValuesBase from "../Models/ValuesBase";

export interface IDataProviderCreator<T,V extends ValuesBase> {
    create(): IDataProvider<T, V>;
}