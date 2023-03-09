import UserEntity from "../../../domain/entities/UserEntity";

export default abstract class UserRepo {
    abstract fetchUsers(): Promise<Array<UserEntity>>;
}