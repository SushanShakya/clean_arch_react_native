export default interface Usecase<T, R> {
    call(param: T): R;
}