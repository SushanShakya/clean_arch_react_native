import LoginParam from "../../domain/entities/LoginParam";
import AuthRepo from "./interface/AuthRepo"

export default class FakeAuthRepo implements AuthRepo {

    async login(param: LoginParam): Promise<string> {
        return `{"access": "123", "refresh": "123"}`
    }
    async renewToken(refreshToken: string): Promise<string> {
        return `{"access": "123"}`
    }

}