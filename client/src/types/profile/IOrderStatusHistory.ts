import { IOrderStatus } from "./IOrderStatus";

export interface IOrderStatusHistory {
    id: number;
    status: IOrderStatus;
    date: string;
}