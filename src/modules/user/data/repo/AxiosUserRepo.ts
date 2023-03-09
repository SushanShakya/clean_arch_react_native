import UserEntity from "../../domain/entities/UserEntity";
import UserRepo from "./interface/UserRepo";
import { axiosClient } from "../../../../core/api/AxiosClient";
import { AxiosInstance } from "axios";

export default class AxiosUserRepo extends UserRepo {

    client: AxiosInstance

    constructor() {
        super();
        this.client = axiosClient;
    }

    async fetchUsers(): Promise<UserEntity[]> {
        let res = await this.client.get('/api/users?page=2');
        console.log(res.data['data']);
        return (res.data['data'] as any[]).map(e => ({
            id: e['id'],
            name: e['first_name'],
            email: e['email'],
            avatar: e['avatar']
        }))
    }
}

export const axiosUserRepo = new AxiosUserRepo();