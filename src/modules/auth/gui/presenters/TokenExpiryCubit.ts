import { AsyncCubit, BlocState, InitialState } from "warped_bloc_react";
import { NoParam } from "../../../../core/usecase/AsyncUsecase";
import ClearTokenInteractor from "../../domain/usecases/ClearTokenInteractor";
import ListenForTokenExpiryInteractor from "../../domain/usecases/ListenForTokenInteractor";
import RefreshTokenInteractor from "../../domain/usecases/RefeshTokenInteractor";

export class ExpiredState implements BlocState { }

export default class TokenExpiryCubit extends AsyncCubit {

    listenForTokenExpiryInteractor: ListenForTokenExpiryInteractor
    refreshTokenInteractor: RefreshTokenInteractor
    clearTokenInteractor: ClearTokenInteractor

    constructor({
        listenForTokenInteractor: listenForTokenExpiryInteractor,
        refreshTokenInteractor,
        clearTokenInteractor
    }: {
        listenForTokenInteractor: ListenForTokenExpiryInteractor
        refreshTokenInteractor: RefreshTokenInteractor
        clearTokenInteractor: ClearTokenInteractor
    }) {
        super(new InitialState())
        this.listenForTokenExpiryInteractor = listenForTokenExpiryInteractor
        this.refreshTokenInteractor = refreshTokenInteractor
        this.clearTokenInteractor = clearTokenInteractor
    }

    async listenForExpiry() {
        try {
            await this.listenForTokenExpiryInteractor.call(async () => {
                try {
                    await this.refreshTokenInteractor.call(new NoParam())
                    this.listenForTokenExpiryInteractor.call(() => {
                        this.expireToken()
                    })
                } catch (e) {
                    this.expireToken()
                }
            })
        } catch (e) {
            this.expireToken()
        }
    }

    async expireToken() {
        try {
            await this.clearTokenInteractor.call(new NoParam())
        } catch (e) { }
        this.emit(new ExpiredState())
    }

    reset() {
        this.emit(new InitialState())
    }
}