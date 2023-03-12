import AsyncUsecase, { NoParam } from "../../../../core/usecase/AsyncUsecase";
import AuthRepo from "../../data/repo/interface/AuthRepo";
import TokenStoreRepo from "../../data/repo/interface/TokenStoreRepo";
import TokenEntity from "../entities/TokenEntity";

export default class RefreshTokenInteractor implements AsyncUsecase<NoParam, void> {
    storeRepo: TokenStoreRepo
    repo: AuthRepo

    constructor({ storeRepo, repo }: { repo: AuthRepo, storeRepo: TokenStoreRepo }) {
        this.storeRepo = storeRepo
        this.repo = repo
    }

    async call(param: NoParam): Promise<void> {
        const token = await this.storeRepo.fetch()
        const refreshToken = token?.refresh
        if (!refreshToken) {
            throw new Error("Token Not Found")
        }
        const access = await this.repo.renewToken(refreshToken)
        const tokenEntity = new TokenEntity(access)
        await this.storeRepo.save(tokenEntity)
    }
}