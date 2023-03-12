import Usecase from "../../../../core/usecase/Usecase";
import TokenStoreRepo from "../../data/repo/interface/TokenStoreRepo";

export default class ListenForTokenExpiryInteractor implements Usecase<() => void, void> {

    storeRepo: TokenStoreRepo

    constructor({ storeRepo }: { storeRepo: TokenStoreRepo }) {
        this.storeRepo = storeRepo
    }

    async call(param: () => void): Promise<void> {
        const onExpired = param
        const token = await this.storeRepo.fetch()
        if (!token) {
            throw new Error("Token not found ")
        }
        const expiry = token.getExpiryInSec()
        if (token.isExpired() || expiry <= 120) {
            onExpired()
            return;
        }
        setTimeout(onExpired, (expiry - 60) * 1000)
    }
}