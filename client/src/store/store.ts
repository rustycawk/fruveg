import AuthStore from "./auth.store"
import BasketStore from "./basket.store"
import OrderStore from "./order.store"

class RootStore {
    authStore:AuthStore
    basketStore: BasketStore
    orderStore:OrderStore
    constructor(){
        this.authStore = new AuthStore()
        this.basketStore = new BasketStore()
        this.orderStore = new OrderStore()
    }
}

export default RootStore