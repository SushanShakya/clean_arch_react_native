import ListenForTokenExpiryInteractor from "./ListenForTokenInteractor";

export default class FakeListenForTokenExpiryInteractor extends ListenForTokenExpiryInteractor {
    async call(param: () => void): Promise<void> {
        console.log('----- Listening For Expiry');
        const onExpiry = param
        setTimeout(() => {
            console.log('----- Timeout')
            console.log('----- Calling Expiry Code');
            onExpiry()
        }, 5000)
    }
}