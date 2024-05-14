import AuthStore from "./auth.store"
import RouterStore from "./router.store"

class RootStore {
    authStore:AuthStore
    routerStore:RouterStore
    constructor(){
        this.authStore = new AuthStore()
        this.routerStore = new RouterStore()
    }
}

export default RootStore