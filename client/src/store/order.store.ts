import { makeAutoObservable } from "mobx";
import { IProfileAddress } from "../types/profile/address/IProfileAddress";
import { IProfilePayment } from "../types/profile/payment/IProfilePayment";

class OrderStore {
    address?:IProfileAddress
    payment?:IProfilePayment
    comments:string
    constructor() {
        this.comments = ''
        makeAutoObservable(this)
    }

    setAddress(address:IProfileAddress) {
        this.address = address
    }

    setPayment(payment:IProfilePayment) {
        this.payment = payment
    }

    setComments(comments:string) {
        this.comments = comments
    }
}

export default OrderStore