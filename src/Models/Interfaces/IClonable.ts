export default interface IClonable<T> {
    clone(oldValues?: T): T;
}