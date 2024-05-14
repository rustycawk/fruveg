import { IProduct } from "../catalog/IProduct";

export interface IOrderProduct {
    id: number;
    product: IProduct;
    salePrice: number;
    amount: number;
}