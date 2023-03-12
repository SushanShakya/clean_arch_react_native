import AsyncUsecase, { NoParam } from "../../../../core/usecase/AsyncUsecase";
import TokenStoreRepo from "../../data/repo/interface/TokenStoreRepo";

export default class ClearTokenInteractor implements AsyncUsecase<NoParam, void> {

    storeRepo: TokenStoreRepo

    constructor({
        storeRepo
    }: {
        storeRepo: TokenStoreRepo
    }) {
        this.storeRepo = storeRepo
    }

    async call(param: NoParam): Promise<void> {
        await this.storeRepo.clear()
    }
}