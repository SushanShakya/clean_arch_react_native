import FakeAuthRepo from "../../../src/modules/auth/data/repo/FakeAuthRepo"
import FakeTokenStoreRepo from "../../../src/modules/auth/data/repo/FakeTokenStoreRepo"
import LoginParam from "../../../src/modules/auth/domain/entities/LoginParam"
import ClearTokenInteractor from "../../../src/modules/auth/domain/usecases/ClearTokenInteractor"
import FakeListenForTokenExpiryInteractor from "../../../src/modules/auth/domain/usecases/FakeListenForTokenExpiryInteractor"
import LoginInteractor from "../../../src/modules/auth/domain/usecases/LoginInteractor"
import RefreshTokenInteractor from "../../../src/modules/auth/domain/usecases/RefeshTokenInteractor"
import TokenExpiryCubit, { ExpiredState } from "../../../src/modules/auth/gui/presenters/TokenExpiryCubit"

describe('Testing Expiry', () => {
    let storeRepo = new FakeTokenStoreRepo()
    let authRepo = new FakeAuthRepo()
    let listenForTokenInteractor = new FakeListenForTokenExpiryInteractor({
        storeRepo
    })
    let clearTokenInteractor = new ClearTokenInteractor({
        storeRepo
    })
    let refreshTokenInteractor = new RefreshTokenInteractor({
        repo: authRepo,
        storeRepo,
    })
    let loginInteractor = new LoginInteractor({
        storeRepo,
        repo: authRepo,
    })
    let tec = new TokenExpiryCubit({
        listenForTokenInteractor,
        clearTokenInteractor,
        refreshTokenInteractor
    })

    test('can listen to expiry', async () => {
        const param: LoginParam = {
            username: "21",
            password: '12'
        }
        tec.listen((e: any) => {
            if (e instanceof ExpiredState) {
                console.log('--- Expired');
                return;
            }
            console.log('--- Not yet Expired')
            console.log(e)
        })
        await loginInteractor.call(param)
        await tec.listenForExpiry()
    })
}) 