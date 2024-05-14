import { makeAutoObservable } from "mobx";
import MakeOrderProductItem from "../types/basket/MakeOrderProductItem";

class BasketStore {
    products:MakeOrderProductItem[]
    constructor(){

        this.products = JSON.parse(localStorage.getItem('basket_products') ?? "[]")

        makeAutoObservable(this)
    }

    getBasketProductsCount() {
        return this.products.length
    }

    isInBasket(productId:number){
        return this.products.some(item => item.productId === productId)
    }

    addProduct(product:MakeOrderProductItem){
        this.products.push(product)
        localStorage.setItem('basket_products', JSON.stringify(this.products))
    }

    changeSaleType(product:MakeOrderProductItem, type:'wholesale' | 'retail'){
        this.products.forEach(item => {
            if(item.productId === product.productId){
                item.saleType = type
            }
        })
        localStorage.setItem('basket_products', JSON.stringify(this.products))
    }

    changePrice(product:MakeOrderProductItem, price:number){
        this.products.forEach(item => {
            if(item.productId === product.productId){
                item.price = price
            }
        })
        localStorage.setItem('basket_products', JSON.stringify(this.products))
    }

    removeProduct(product:MakeOrderProductItem){
        this.products = this.products.filter(item => item.productId !== product.productId)
        localStorage.setItem('basket_products', JSON.stringify(this.products))
    }

    setProductAmount(productId:number, amount:number){
        const product = this.products.find(item => item.productId === productId)
        if(product){
            product.amount = amount
        }
        localStorage.setItem('basket_products', JSON.stringify(this.products))
    }

    getBasketTotal(){
        return this.products.reduce((acc, item) => acc + item.price * item.amount, 0)
    }
}

export default BasketStore