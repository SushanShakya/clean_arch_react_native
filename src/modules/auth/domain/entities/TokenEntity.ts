import jwtDecode from "jwt-decode"

export default class TokenEntity {
    access: string
    refresh?: string

    constructor(access: string, refresh?: string) {
        this.access = access
        this.refresh = refresh
    }

    getExpiryInSec(): number {
        const decoded = jwtDecode<any>(this.access)
        const absexpiry = decoded.exp * 1000;
        const now = (new Date()).getTime()
        const expiry = absexpiry - now
        return Math.floor(expiry / 1000)
    }

    isExpired(): boolean {
        const expiry = this.getExpiryInSec()
        return expiry <= 0
    }
}