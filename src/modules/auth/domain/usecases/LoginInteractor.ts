import AuthRepo from "../../data/repo/interface/AuthRepo"
import AsyncUsecase from "../../../../core/usecase/AsyncUsecase"
import LoginParam from "../entities/LoginParam"
import TokenStoreRepo from "../../data/repo/interface/TokenStoreRepo"
import TokenEntity from "../entities/TokenEntity"

export default class LoginInteractor implements AsyncUsecase<LoginParam, void>   {
    repo: AuthRepo
    storeRepo: TokenStoreRepo

    constructor({ repo, storeRepo }: { repo: AuthRepo, storeRepo: TokenStoreRepo }) {
        this.repo = repo
        this.storeRepo = storeRepo
    }

    async call(param: LoginParam): Promise<void> {
        const res = await this.repo.login(param)
        const data = JSON.parse(res)
        const { access, refresh } = data;
        const token = new TokenEntity(access, refresh)
        await this.storeRepo.save(token)
    }
}