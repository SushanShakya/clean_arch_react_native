import UserEntity from "../../domain/entities/UserEntity";
import UserRepo from "./interface/UserRepo";

class NormalUserRepo extends UserRepo {
    async fetchUsers(): Promise<UserEntity[]> {
        let res = await fetch('https://reqres.in/api/users?page=2');
        let body = await res.json();
        console.log(body);
        return (body['data'] as Array<any>).map(e => ({
            id: e['id'],
            name: e['first_name'],
            email: e['email'],
            avatar: e['avatar']
        }));
    }
}

export const normalUserRepo = new NormalUserRepo();