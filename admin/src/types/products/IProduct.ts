import { IProductType } from "../productTypes/IProductType";
import { IProductImage } from "./IProductImage";

export interface IProduct {
    id: number;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    name: string;
    article: string;
    description: string;
    price: number;
    whosalePrice: number;
    whosaleQuantity: number;
    dimensionValue: number;
    dimensions: string;
    visible: boolean;
    images: IProductImage[];
    productType: IProductType;
}