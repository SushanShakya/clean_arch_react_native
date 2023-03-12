import LoginParam from "../../../domain/entities/LoginParam";

export default abstract class AuthRepo {
    abstract login(param: LoginParam): Promise<string>
    abstract renewToken(refreshToken: string): Promise<string>
}