import TokenEntity from "../../domain/entities/TokenEntity";
import TokenStoreRepo from "./interface/TokenStoreRepo";

export default class FakeTokenStoreRepo implements TokenStoreRepo {

    token?: TokenEntity

    async save(token: TokenEntity): Promise<void> {
        this.token = token
    }
    async fetch(): Promise<TokenEntity | undefined> {
        return this.token
    }
    async clear(): Promise<void> {
        this.token = undefined
    }

}