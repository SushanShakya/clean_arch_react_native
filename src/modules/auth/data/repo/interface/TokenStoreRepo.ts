import TokenEntity from "../../../domain/entities/TokenEntity";

export default interface TokenStoreRepo {
    save(token: TokenEntity): Promise<void>
    fetch(): Promise<TokenEntity | undefined>
    clear(): Promise<void>
}