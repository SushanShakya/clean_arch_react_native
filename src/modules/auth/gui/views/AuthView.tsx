import { View, Text } from 'react-native'
import FakeTokenStoreRepo from '../../data/repo/FakeTokenStoreRepo'
import FakeAuthRepo from '../../data/repo/FakeAuthRepo'
import FakeListenForTokenExpiryInteractor from '../../domain/usecases/FakeListenForTokenExpiryInteractor'
import ClearTokenInteractor from '../../domain/usecases/ClearTokenInteractor'
import RefreshTokenInteractor from '../../domain/usecases/RefeshTokenInteractor'
import LoginInteractor from '../../domain/usecases/LoginInteractor'
import TokenExpiryCubit, { ExpiredState } from '../presenters/TokenExpiryCubit'
import { useEffect, useState } from 'react'
import { BlocBuilder, BlocListener } from 'warped_bloc_react'
import LoginParam from '../../domain/entities/LoginParam'

const AuthView = () => {

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

    const [loggedIn, setLoggedIn] = useState(true)

    useEffect(() => {
        const param: LoginParam = {
            username: "123",
            password: "1234"
        }
        loginInteractor.call(param).then(e => {
            tec.listenForExpiry()
        })

    }, []);

    return (
        <BlocListener bloc={tec} listener={(state) => {
            if (state instanceof ExpiredState) {
                console.log('--- Expired State')
                setLoggedIn(false)
            }
            console.log('---- Not Expired State')
        }} child={
            <View>
                <Text>{loggedIn ? "Logged IN" : "Logged Out"}</Text>
            </View>
        } />
    )
}

export default AuthView