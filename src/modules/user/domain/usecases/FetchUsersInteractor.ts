import AsyncUsecase, { NoParam } from "../../../../core/usecase/AsyncUsecase";
import { axiosUserRepo } from "../../data/repo/AxiosUserRepo";
import UserRepo from "../../data/repo/interface/UserRepo";
import { normalUserRepo } from "../../data/repo/NormalUserRepo";
import UserEntity from "../entities/UserEntity";


export default class FetchUsersInteractor implements AsyncUsecase<NoParam, Array<UserEntity>> {
    constructor(private readonly repo: UserRepo) { }

    async call(param: NoParam): Promise<UserEntity[]> {
        let users = await this.repo.fetchUsers();
        /*
            Do some changes if required
        */
        return users
    }
}

export const fetchUsersInteractor = new FetchUsersInteractor(normalUserRepo);