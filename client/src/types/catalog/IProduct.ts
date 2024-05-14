import { IProductType } from "./IProductType";

export interface IProduct {
    id: number;
    name: string;
    article: string;
    description: string;
    dimensionValue: number;
    dimensions: string;
    price: number;
    productType: IProductType;
    images: string[];
    whosalePrice:number
    whosaleQuantity:number
}
