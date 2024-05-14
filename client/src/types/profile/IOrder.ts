import { IOrderProduct } from './IOrderProduct';
import { IOrderStatusHistory } from "./IOrderStatusHistory";
import { IProfileAddress } from './address/IProfileAddress';
import { IProfilePayment } from './payment/IProfilePayment';

export interface IOrder {
    id: number;
    date: string;
    orderProducts: IOrderProduct[];
    address: IProfileAddress;
    payment: IProfilePayment;
    statusHistories: IOrderStatusHistory[];
    comment: string;
}