export default interface AsyncUsecase<P, R> {
    call(param: P): Promise<R>
}

export class NoParam { }